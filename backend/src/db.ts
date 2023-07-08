import mongoose, {ConnectOptions} from 'mongoose';
import * as process from "process";
import * as dotenv from "dotenv";

dotenv.config();

const MONGODB_URI: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`;
const connectToDatabase = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {

        await mongoose.connect(MONGODB_URI);

        const db = mongoose.connection;

        db.on('error', (error) => {
            console.error('MongoDB connection error:', error);
            reject(error);
        });

        db.once('open', () => {
            console.log('Connected to MongoDB');
            resolve();
        });
    });
};

export default connectToDatabase;
