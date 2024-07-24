import express from 'express';
import { getResponse, 
        postResponse, 
        updateResponse, 
        deleteResponse, 
        registerResponse, 
        loginResponse, 
        deleteUserResponse,
        logoutResponse
    } from '../controllers/controller.js';
import { validateUser, validateId, authenticateToken } from '../middleware/middleware.js';

const router = express.Router();

router.get('/:userId', authenticateToken, getResponse);
router.post('/post', authenticateToken, postResponse);
router.put('/update/:userId', authenticateToken, updateResponse);
router.delete('/del/:userId', authenticateToken, deleteResponse);
router.post('/register', validateUser, registerResponse);
router.post('/login', validateUser, loginResponse);
router.post('/del-user', authenticateToken, validateId, deleteUserResponse);
router.post('/logout', authenticateToken, logoutResponse);

export default router;