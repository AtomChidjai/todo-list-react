import express from 'express';
import { getResponse, 
        postResponse, 
        updateResponse, 
        deleteResponse, 
        registerResponse, 
        loginResponse, 
        deleteUserResponse 
    } from '../controllers/controller.js';
import { validateUser, validateId } from '../middleware/middleware.js';

const router = express.Router();

router.get('/:userId', getResponse);
router.post('/post', postResponse);
router.put('/update/:userId', updateResponse);
router.delete('/del/:userId', deleteResponse);
router.post('/register', validateUser, registerResponse);
router.post('/login', validateUser, loginResponse);
router.post('/del-user', validateId, deleteUserResponse);

export default router;