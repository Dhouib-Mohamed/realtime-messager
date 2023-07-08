import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import {Server, Socket} from 'socket.io';
import User from "../models/User";
import Message from "../models/Message";


export default function messagerRouter(io: Server) {

    const router = express.Router();


    router.get('/:sender/:receiver', async (req: Request, res: Response) => {
        try {
            const {sender, receiver} = req.params;
            const page = +(req.query.page ?? 1);
            const pageSize = +(req.query.pageSize ?? 10);

            const messages = await Message.find({
                $or: [
                    {sender: sender, receiver: receiver},
                    {sender: receiver, receiver: sender}
                ]
            }).sort({createdAt: -1})
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            res.json(messages);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'Server error'});
        }
    });


    async function saveMessage(sender: string, receiver: string, body: string): Promise<void> {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const message = new Message({
                sender,
                receiver,
                body,
            });

            await message.save();

            await User.findOneAndUpdate({email: sender}, {$push: {messages: message._id}}, {session});

            await User.findOneAndUpdate({email: receiver}, {$push: {messages: message._id}}, {session});

            await session.commitTransaction();
            io.to(sender).emit('newMessage', {message, notif: false});
            io.to(receiver).emit('newMessage', {message, notif: true});
        } catch (err) {
            console.error(err);
            await session.abortTransaction();
            throw new Error('Failed to save message');
        } finally {
            await session.endSession();
        }
    }

// Send a new message
    router.post('/', async (req: Request, res: Response) => {
        try {
            const {sender, receiver, body} = req.body;

            // Save message and update users' message lists
            await saveMessage(sender, receiver, body);

            res.json({message: 'Message sent successfully'});

        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'Server error'});
        }
    });
// Socket.io connection
    io.on('connection', (socket: Socket) => {
        console.log('New client connected:', socket.id);

        socket.on('join', (user: string) => {
            console.log('User joined:', user);
            socket.join(user);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return router;

}


