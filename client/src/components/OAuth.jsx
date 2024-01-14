import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess,signInError } from "../redux-toolkit/user/userSlice";
import { useNavigate } from "react-router-dom";



const OAuth = () => {


    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleGoogleClick=async()=>{
      try {
        const provider=new GoogleAuthProvider();
        const auth=getAuth(app);
        const result=await signInWithPopup(auth,provider);
        console.log(result);

        const res= await fetch("http://localhost:3007/api/v1/auth/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:result.user.displayName,email:result.user.email,imageUrl:result.user.photoURL}),
          });

        const data=await res.json();
        if(data.success===false){
            dispatch(signInError(data.message))
        }
        dispatch(signInSuccess(data.rest));
        navigate("/")
        console.log(data.user);
        
      } catch (error) {
          dispatch(signInError(error.message))
      }
    }
  return (
    <button type="button" onClick={handleGoogleClick} className="bg-red-700 text-white uppercase rounded-md p-2 font-semibold w-full mt-2 mb-1 hover:bg-red-900 ">Continue with Google</button>
    )
}

export default OAuth