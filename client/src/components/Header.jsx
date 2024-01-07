import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";



const Header = () => {
  return (
    <div className="bg-slate-300 p-3 shadow-sm sticky top-0">
          <div className="max-w-6xl mx-auto flex justify-between">
             <h1 className="text-slate-500 font-bold text-xl">Sahand<span className="text-black font-bold">Estate</span></h1>
             <div className="flex items-center border rounded bg-slate-200 p-1">
                <input type="text" placeholder="Search..." className=" bg-slate-200 outline-none"/>
                <IoIosSearch className="text-xl text-slate-400"/>
             </div>
             <ul className="flex items-center space-x-4">
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/profile">
                <img src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg" alt="picture" className="w-6 border rounded-full"/>
                </Link></li>
             </ul>
          </div>
    </div>
  )
}

export default Header