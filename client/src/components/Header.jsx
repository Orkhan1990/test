import { IoIosSearch } from "react-icons/io";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const[searchTerm,setSearchTerm]=useState("");
  const navigate=useNavigate();
  console.log(currentUser);
  console.log(searchTerm);

  const handleSearchSubmit=async(e)=>{
      e.preventDefault();

      const urlParams=new URLSearchParams(window.location.search);
      urlParams.set('searchTerm',searchTerm);
      const searchQuery=urlParams.toString();
      navigate(`/search?${searchQuery}`)
  }

  useEffect(()=>{
     const urlParams=new URLSearchParams(location.search);
     const searchTermFromUrl=urlParams.get("searchTerm");
     setSearchTerm(searchTermFromUrl)
  },[location.search])
  
  return (
    <header className="bg-slate-200 p-3 shadow-md sticky top-0">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="flex items-center text-sm sm:text-xl">
          <Link to="/">
            <span className="text-slate-500 font-bold ">Sahand</span>
            <span className="text-slate-700 font-bold">Estate</span>
          </Link>
        </h1>
        <form onSubmit={handleSearchSubmit} className="flex items-center border rounded bg-slate-100 p-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-24 sm:w-64"
            id="search"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button>
            <IoIosSearch className="text-xl text-slate-400" />
          </button>
        </form>
        <ul className="flex items-center space-x-4">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="/about">About</Link>
          </li>
          <li className="text-slate-700 hover:underline">
            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.imageUrl}
                  alt="picture"
                  className="w-7 border rounded-full"
                />
              </Link>
            ) : (
              <Link to="/signIn">Sign in</Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
