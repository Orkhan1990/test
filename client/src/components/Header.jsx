import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";



const Header = () => {
  return (
    <header className="bg-slate-200 p-3 shadow-md sticky top-0">
          <div className="max-w-6xl mx-auto flex justify-between">
             <h1 className="flex items-center text-sm sm:text-xl">
               <Link to="/">
               <span className="text-slate-500 font-bold ">Sahand</span>
               <span className="text-slate-700 font-bold">Estate</span>
               </Link>
               </h1>
             <form className="flex items-center border rounded bg-slate-100 p-1">
                <input type="text" placeholder="Search..." className="bg-transparent outline-none w-24 sm:w-64"/>
                <IoIosSearch className="text-xl text-slate-400"/>
             </form>
             <ul className="flex items-center space-x-4">
                <li className="hidden sm:inline text-slate-700 hover:underline"><Link to={"/"}>Home</Link></li>
                <li className="hidden sm:inline text-slate-700 hover:underline"><Link to="/about">About</Link></li>
                <li className="text-slate-700 hover:underline"><Link to="/signIn">
                 Sign in
                {/* <img src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg" alt="picture" className="w-6 border rounded-full"/> */}
                </Link></li>
             </ul>
          </div>
    </header>
  )
}

export default Header