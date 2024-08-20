import Task from '../models/model.js';
import User from '../models/model2.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function getResponse(req, res) {
    const userId = req.user?.decodedPayload?.userId;
    
    if (!userId) {
        return res.status(400).json({ error : 'User ID is not found'});
    }
    try{
        const resTask = await Task.find({ userId });

        res.status(200).json(resTask);
    }catch (err){
        res.status(500).json({ error : `Error occurred: ${err.message}` })
    }
}

export async function updateResponse (req, res) {
    const { content } = req.body;
    const { taskId } = req.params;
    
    const userId = req.user?.decodedPayload?.userId;

    if (!userId) {
        return res.status(400).json({ error : 'User ID is required'});
    }
    try{
        const updatedObject = { content };

        const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId, userId },
            updatedObject,
            { new : true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error : 'Task not found' });
        }
        res.status(200).json(updatedTask);
    }
    catch(err){
        res.status(500).json({ error : `Error occurred: ${err.message}` });
    }
} 

export async function deleteResponse(req, res) {
    const userId = req.user?.decodedPayload?.userId;
    const { taskId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const deletedTask = await Task.findOneAndDelete({ _id : taskId, userId });
        
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(deletedTask);
    } catch (err) {
        res.status(500).json({ error: `Error occurred: ${err.message}` });
    }
}

export async function postResponse(req, res) {
    const { content } = req.body;

    const userId = req.user?.decodedPayload?.userId;

    if (!userId || !content) {
        return res.status(400).json({ error: 'User ID and content are required' });
    }
    try {
        const task = new Task({ userId, content });
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ error: `Error occurred: ${err.message}` });
    }
}

export async function registerResponse(req, res) {
    const { username, password } = req.body;

    try {
        const checkUser = await User.findOne({ username });

        if (checkUser) {
            return res.status(400).json({ error : 'username is already been used' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password : hashedPassword });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: `Error occurred: ${err.message}` });
    }
}

export async function loginResponse(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            path: '/',
            sameSite: 'Lax', 
        });

        return res.status(200).json({ message: 'Login Successfully' });

    } catch (err) {
        res.status(500).json({ error: `Error occurred: ${err.message}` });
    }
}


export async function deleteUserResponse(req, res) {
    const { _id } = req.body;

    try {
        const user = await User.findByIdAndDelete(_id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: `Error occurred: ${err.message}` });
    }
}

export async function logoutResponse (req, res) {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
        return res.status(200).json({ message: 'Logout Successfully' });
    } catch (err) {
        return res.status(500).json({ error: `Error occurred: ${err.message}` });
    }
}