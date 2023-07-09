import express, {Request, Response} from 'express';
import {Server} from 'socket.io';
import User from "../models/User";
import Message from "../models/Message";

const router = express.Router();
const io = new Server()

router.get('/:email', async (req: Request, res: Response) => {
    try {
        const {email} = req.params;
        // Check if the email exists
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(404).json({error: 'User not found'});
        }
        res.json({user: {username: existingUser.username, email: existingUser.email}});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
});

router.get('/list/:sender', async (req: Request, res: Response) => {
    try {
        const {sender} = req.params;
        const page = +(req.query.page ?? 1);
        const pageSize = +(req.query.pageSize ?? 10);

        const messages = await Message.aggregate([
            {
                $match: {
                    $or: [
                        {sender: sender},
                        {receiver: sender}
                    ]
                }
            },
            {
                $sort: {createdAt: -1} // Sort by createdAt in descending order
            },
            {
                $group: {
                    _id: {
                        $cond: [
                            {$eq: ['$sender', sender]},
                            '$receiver',
                            '$sender'
                        ]
                    },
                    lastMessage: {$first: '$body'},
                    createdAt: {$first: '$createdAt'},
                    sender: {$first: '$sender'},
                }
            },
            {
                $sort: {createdAt: -1} // Sort by createdAt in descending order
            }
        ]);

        const userList = await User.aggregate([
            {
                $match: {
                    email: {$in: messages.map(message => message._id)}
                }
            },
            {
                $project: {
                    _id: 0,
                    email: 1,
                    username: 1,
                    lastMessage: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: messages,
                                    as: 'message',
                                    cond: {$eq: ['$$message._id', '$email']}
                                }
                            },
                            0
                        ]
                    }
                }
            },
            {
                $sort: {'lastMessage.createdAt': -1} // Sort by lastMessage.createdAt in descending order
            },
            {
                $skip: ((page - 1) * pageSize)
            },
            {
                $limit: pageSize
            }
        ]);

        return res.json(userList);
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
});


export default router;


