import {Document, model, Schema} from "mongoose";

export interface IMessage extends Document {
    sender: string;
    receiver: string;
    body: string;
    createdAt: Date;
}

const messageSchema: Schema = new Schema({
    sender: String,
    receiver: String,
    body: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model<IMessage>('Message', messageSchema);

