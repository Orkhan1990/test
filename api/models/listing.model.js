import mongoose from "mongoose";

const listingShema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    regularPrice:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    furnished:{
        type:Boolean,
        required:true
    },
    parking:{
     type:Boolean,
     required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true
    },
    imageUrls:{
        type:Array,
        required:true
    },
    offer:{
        type:Boolean,
        required:true
    },
    useRef:{
        type:String,
        required:true
    }
})


const Listing=mongoose.model('listing',listingShema);

export default Listing;