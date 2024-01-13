import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInSuccess,
  signInError,
  signInLoading,
} from "../redux-toolkit/user/userSlice.js";

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {loading,error} = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInLoading());
    try {
      const result = await fetch("http://localhost:3007/api/v1/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await result.json();
      dispatch(signInSuccess(data));
      console.log(data);
      if (data.success === false) {
        dispatch(signInError(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInError(error.message));
    }
  };

  console.log(formData);
  return (
    <main className="max-w-md mx-auto h-full mt-24">
      <h1 className="text-center font-bold text-black text-3xl">Sign In</h1>
      <div className="mt-8">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            required
            type="email"
            placeholder="Email"
            id="email"
            className="rounded-md p-2 outline-none"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            required
            type="password"
            placeholder="Password"
            id="password"
            className="rounded-md p-2 outline-none"
            onChange={handleChange}
            value={formData.password}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white uppercase rounded-md p-2 font-semibold hover:bg-slate-900 disabled:opacity-45"
          >
            {loading ? "Loading...." : "Sign In"}
          </button>
        </form>
        <button className="bg-red-700 text-white uppercase rounded-md p-2 font-semibold w-full mt-2 mb-1 hover:bg-red-900 ">
          Continue with Google
        </button>
        <div>
          <span>
            Do not have any account?
            <Link to="/signUp" className="text-blue-800 ml-2 font-semibold">
              Sign up
            </Link>
          </span>
        </div>
        {error && <p className="text-red-700 font-semibold">{error}</p>}
      </div>
    </main>
  );
};

export default SignIn;
