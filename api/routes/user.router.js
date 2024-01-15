import express from 'express';
import { updateProfile } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyToken.js';




const router=express.Router();


router.post('/updateProfile/:id',verifyToken,updateProfile);




export default router;