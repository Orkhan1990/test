import express from 'express';
import { deleteUser, getUserListings, updateProfile,getUser} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyToken.js';




const router=express.Router();


router.post('/updateProfile/:id',verifyToken,updateProfile);
router.delete('/deleteProfile/:id',verifyToken,deleteUser);
router.get('/listings/:id',verifyToken,getUserListings);
router.get('/:id',verifyToken,getUser);




export default router;