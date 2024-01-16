import express from 'express';
import { deleteUser, updateProfile } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyToken.js';




const router=express.Router();


router.post('/updateProfile/:id',verifyToken,updateProfile);
router.delete('/deleteProfile/:id',verifyToken,deleteUser);




export default router;