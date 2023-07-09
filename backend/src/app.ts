import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import authRouter from './routes/auth';
import messagerRouter from './routes/messager';
import userRouter from './routes/user';
import connectToDatabase from "./db";
import cors from 'cors';
import * as dotenv from "dotenv";
import {Server} from "socket.io";
import {createServer} from "http";

dotenv.config();

const app = express();
app.use(cors());


const PORT = process.env.PORT || '3000';
const SocketIOPort = process.env.SOCKET_PORT || '3001';
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173', // Set the appropriate client origin here
        methods: ['GET', 'POST'], // Add the HTTP methods you want to allow
        allowedHeaders: ['Content-Type', 'Authorization'], // Add the allowed headers
        credentials: true, // Set to true if you want to allow sending cookies with the request
    },
});

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Database connection
connectToDatabase().then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Failed to connect to MongoDB:', error);
});

// Routes
app.use('/auth', authRouter);
app.use('/messager', messagerRouter(io));
app.use('/user', userRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
httpServer.listen(SocketIOPort, () => {
    console.log(`Socket IO Server is running on port ${SocketIOPort}`);
});

