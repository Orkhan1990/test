import { Link} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { deleteUserSuccess, signOut, updateUserError, updateUserLoading, updateUserSuccess } from "../redux-toolkit/user/userSlice";

const Profile = () => {
  const { currentUser,error,loading} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileProgress, setFileProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const[updateProfileSuccess,setUpdateProfileSuccess]=useState(false);
  const[listingsError,setListingsError]=useState(false);
  const[listings,setListings]=useState([]);
  const dispatch=useDispatch();
  const fileRef = useRef(null);
  console.log(fileProgress);
  console.log(currentUser);
  console.log((listingsError));

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //UPDATE PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();
   dispatch(updateUserLoading());

   try {
     const result = await fetch(
       `http://localhost:3007/api/v1/user/updateProfile/${currentUser._id}`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(formData),
       }
     );
     const data = await result.json();
     if(data.success===false){
       dispatch(updateUserError(data.message))
     }

     dispatch(updateUserSuccess(data.rest))
     setUpdateProfileSuccess(true);
     console.log(data);
    
   } catch (error) {
      dispatch(updateUserError(error.message))
   }
  };



  //DELETE USER(DELETE BUTTON)
  const handleDelete=async()=>{
    
    try {
      const result=await fetch(`http://localhost:3007/api/v1/user/deleteProfile/${currentUser._id}`,
      {
        method:"DELETE"
      })
      
      const data=result.json();
      console.log(data);
      dispatch(deleteUserSuccess());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


  //FILE (IMAGES UPLOAD)
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileProgress(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, imageUrl: downloadURL });
        });
      }
    );
  };


  //SIGN OUT

  const handleSignOut=async()=>{

    try {
      const result=await fetch("http://localhost:3007/api/v1/auth/signOut");
      const data=result.json();
      console.log(data);
      dispatch(signOut())
    } catch (error) {
      console.log(error.message);
    }
  }

   //GET USER LISTINGS

     const handleUserListings=async()=>{
      try {
        const result=await fetch(`http://localhost:3007/api/v1/user/listings/${currentUser._id}`);
        const data=result.json();
        
        if(data.success===false){
          setListingsError(true);
          return;
        }
        setListings(data)
        
      } catch (error) {
         setListingsError(error.message)
      }
     }

     //DELETE LISTING

     const deleteListing=async(id)=>{
      try {
           const result=await fetch(`http://localhost:3007/api/v1/listing/deleteListing/${id}`,{
            method:"DELETE"
           })

           const data=await result.json();
           if(data.success==false){
            console.log(data.message);
            return;
           }
           setListings((prev)=>prev.filter((i)=>i._id!=id));
      } catch (error) {
        console.log(error);
      }
     }

  return (
    <div className="max-w-[400px] mx-auto text-center mt-10">
      <h1 className="text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          hidden
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.imageUrl || currentUser.imageUrl}
          alt=""
          className="w-24 h-24 rounded-full my-5 self-center object-cover cursor-pointer"
          accept="image/.*"
        />
        {fileUploadError ? (
          <span className="text-red-700">Error image upload</span>
        ) : fileProgress > 0 && fileProgress < 100 ? (
          <span className="text-slate-700">{`Uploading ${fileProgress}`}</span>
        ) : fileProgress === 100 ? (
          <span className="text-green-700">Image upload successfuly!</span>
        ) : (
          ""
        )}
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="p-2 rounded-md"
          onChange={handleChange}
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="p-2 rounded-md"
          onChange={handleChange}
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="p-2 rounded-md"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700  text-white uppercase rounded-md p-2 hover:bg-slate-500">
         {loading?"Loading....":"Update"}
        </button>
        <Link to="/create-listing">
        <button type="button" className="w-full bg-green-700  text-white uppercase rounded-md p-2 hover:bg-green-500">
         Create Listing
        </button>
        </Link>
      </form>
      <div className="flex justify-between my-2 text-red-700 ">
        <span onClick={handleDelete} className="cursor-pointer hover:text-red-400">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer hover:text-red-500">Sign Out</span>
      </div>
      {error&&(<span className="text-red-700 text-sm">{error.message}</span>)}
      {updateProfileSuccess&&(<span className="text-green-700 text-sm">User is updated successfuly!</span>)}
      <span onClick={handleUserListings} className="text-green-700 cursor-pointer hover:text-green-400">
        Show listing
      </span>
      {listings&&listings.length>0&& listings.map((listing,index)=>(
        <div key={index}>
          <h1 className="text-center">Your Listing</h1>
          <div className="flex justify-between items-center border border-gray-400 p-2">
              <Link  to={`/listing/${listing._id}`}>
            <img src={listing.imagesUrl[0]} alt="picture" className="h-16 w-16 object-contain rounded-lg"/>
            <h2 className="font-semibold truncate">{listing.name}</h2>
            </Link>
            <div className="flex flex-col">
              <span onClick={()=>deleteListing(listing._id)} className="text-red-700 uppercase">Delete</span>
              <Link to={`/update-listing/${listing._id}`}>
              <span className="text-green-700 uppercase">Edit</span>
              </Link>
            </div>
          </div>
          </div>
      ))}
    </div>
  );
};

export default Profile;
