import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { updateUserError, updateUserLoading, updateUserSuccess } from "../redux-toolkit/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileProgress, setFileProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const dispatch=useDispatch();
  const fileRef = useRef(null);
  console.log(fileProgress);
  console.log(currentUser);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
   dispatch(updateUserLoading());

   try {
     const result = await fetch(
       `http://localhost:3007/api/v1/profile//updateProfile/${currentUser._id}`,
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
     console.log(data);
    
   } catch (error) {
      dispatch(updateUserError(error.message))
   }
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

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

  console.log(file);
  console.log(formData);
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
        <button disabled={currentUser.loading} className="bg-slate-700  text-white uppercase rounded-md p-2 hover:bg-slate-500">
         {currentUser.loading?"LOading....":"Update"}
        </button>
        <button className="bg-green-700  text-white uppercase rounded-md p-2 hover:bg-green-500">
          <Link>Create Listing</Link>
        </button>
      </form>
      <div className="flex justify-between my-2 text-red-700 ">
        <span className="cursor-pointer hover:text-red-400">
          Delete Account
        </span>
        <span className="cursor-pointer hover:text-red-500">Sign Out</span>
      </div>
      <span className="text-green-700 cursor-pointer hover:text-green-400">
        Show listing
      </span>
    </div>
  );
};

export default Profile;
