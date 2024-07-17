import express from 'express';
import { sendResponse, postResponse, updateResponse, deleteResponse } from '../controllers/controller.js';

const router = express.Router();

router.get('/', sendResponse);
router.post('/post', postResponse);
router.put('/update', updateResponse);
router.delete('/del', deleteResponse);

export default router;