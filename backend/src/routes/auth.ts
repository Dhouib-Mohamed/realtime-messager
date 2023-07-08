import express, {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import User, {IUser} from '../models/User';

const router = express.Router();

// Sign up route
router.post('/signup', async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const {email, password, username} = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({error: 'Email already exists'});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser: IUser = new User({
            email,
            password: hashedPassword,
            username: username
        });

        // Save the user to the database
        const user = await newUser.save();
        console.log(user)
        res.status(201).json({message: 'User created successfully', user});
    } catch (error) {
        res.status(500).json({error});
    }
});

// Sign in route
router.post('/signin', async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        // Check if the email exists
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(404).json({error: 'User not found'});
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({error: 'Invalid password'});
        }
        console.log(existingUser)

        res.json({message: 'Sign in successful', user: existingUser});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;
