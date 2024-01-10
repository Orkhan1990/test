import { useState } from "react"
import { Link } from "react-router-dom"

const SignUp = () => {
  // const[error,setError]=useState("");
  // const [loading,setLoading]=useState(false);
  const [formData,setFormData]=useState({
     username:"",
     email:"",
     password:""
  })


  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const result=await fetch("http://localhost:3007/api/v1/auth/signUp",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(formData)
    })

    const data=await result.json();
    console.log(data);
  }

  console.log(formData);
  return (
    <main className="max-w-md mx-auto h-full mt-24">
        <h1 className="text-center font-bold text-black text-3xl">Sign Up</h1>
        <div className="mt-8">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
          <input type="text" placeholder="Username"  id="username" className="rounded-md p-2 outline-none" onChange={handleChange} value={formData.username}/>
          <input type="email" placeholder="Email" id="email" className="rounded-md p-2 outline-none" onChange={handleChange} value={formData.email}/>
          <input type="password" placeholder="Password" id="password" className="rounded-md p-2 outline-none" onChange={handleChange} value={formData.password}/>
          <button  className="bg-slate-700 text-white uppercase rounded-md p-2 font-semibold hover:bg-slate-900 disabled:opacity-45">Sign up</button>
        </form>
         <button className="bg-red-700 text-white uppercase rounded-md p-2 font-semibold w-full mt-2 mb-1 hover:bg-red-900 ">Continue with Google</button>
         <div>
          <span>Have an account?<Link to="/signIn" className="text-blue-800 ml-2 font-semibold">Sign in</Link></span>
         </div>
        </div>
    </main>
  )
}

export default SignUp


