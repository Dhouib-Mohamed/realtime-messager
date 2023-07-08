import mongoose, {Document, Schema} from 'mongoose';
import {IMessage} from "models/Message";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    messages: IMessage['_id'][];
}

const userSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
});

export default mongoose.model<IUser>('User', userSchema);
