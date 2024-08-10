import express from 'express';
import { getResponse, 
        postResponse, 
        updateResponse, 
        deleteResponse, 
        registerResponse, 
        loginResponse, 
        deleteUserResponse,
        logoutResponse,
    } from '../controllers/controller.js';
import { validateUser, validateId, authenticateToken, decodedToken } from '../middleware/middleware.js';

const router = express.Router();

router.get('/', authenticateToken, decodedToken, getResponse);
router.post('/post', authenticateToken, decodedToken, postResponse);
router.put('/update/:taskId', authenticateToken, decodedToken, updateResponse);
router.delete('/del/:taskId', authenticateToken, decodedToken, deleteResponse);
router.post('/register', validateUser, registerResponse);
router.post('/login', validateUser, loginResponse);
router.post('/del-user', authenticateToken, validateId, deleteUserResponse);
router.post('/logout', authenticateToken, logoutResponse);

export default router;