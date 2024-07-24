import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export function validateUser (req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    next();
}

export function validateId (req, res, next) {
    const { _id } = req.body;

    if (!_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    next();
}

export function authenticateToken (req, res, next) {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message : 'NO TOKEN!'})
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message : 'INVALID OR EXPIRED TOKEN!'})
        }

        req.user = user;
        next();
    });
}