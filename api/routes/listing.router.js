import express from 'express';
import { createListing,deleteLisitng, getListing, updateListing,getListings} from '../controllers/listingController.js';
import { verifyToken } from '../utils/verifyToken.js';



const router=express.Router();
router.post('/createListing',verifyToken,createListing);
router.post('/updateListing/:id',verifyToken,updateListing)
router.delete('/deleteListing/:id',verifyToken,deleteLisitng)
router.get('/getListing/:id',getListing);
router.get('/get',getListings);


export default router;