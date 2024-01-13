import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"

const SignUp = () => {
  const[error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const [formData,setFormData]=useState({
     username:"",
     email:"",
     password:""
  })
const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      const result=await fetch("http://localhost:3007/api/v1/auth/signUp",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(formData)
      })
  
      const data=await result.json();
      console.log(data);
      if(data.success===false){
        setLoading(false);
        setError(data.message);
         return;
      }
      setLoading(false);
      setError(null);
      navigate("/signIn")
    } catch (error) {
      setError(error.message);
      setLoading(false)
    }

  }

  console.log(formData);
  return (
    <main className="max-w-md mx-auto h-full mt-24">
        <h1 className="text-center font-bold text-black text-3xl">Sign Up</h1>
        <div className="mt-8">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
          <input required type="text" placeholder="Username"  id="username" className="rounded-md p-2 outline-none" onChange={handleChange} value={formData.username}/>
          <input required type="email" placeholder="Email" id="email" className="rounded-md p-2 outline-none" onChange={handleChange} value={formData.email}/>
          <input required type="password" placeholder="Password" id="password" className="rounded-md p-2 outline-none" onChange={handleChange} value={formData.password}/>
          <button disabled={loading}  className="bg-slate-700 text-white uppercase rounded-md p-2 font-semibold hover:bg-slate-900 disabled:opacity-45">{loading?"Loading....":"Sign Up"}</button>
        </form>
         <button className="bg-red-700 text-white uppercase rounded-md p-2 font-semibold w-full mt-2 mb-1 hover:bg-red-900 ">Continue with Google</button>
         <div>
          <span>Have an account?<Link to="/signIn" className="text-blue-800 ml-2 font-semibold">Sign in</Link></span>
         </div>
         <p className="text-red-700 font-semibold">{error}</p>
        </div>
    </main>
  )
}

export default SignUp


