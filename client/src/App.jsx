import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import UpdateListing from "./pages/UpdateListing";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route element={<PrivateRoute/>}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/listing/:id" element={<Listing/>}/>
        <Route path="/update-listing/:id" element={<UpdateListing/>}/>
        <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/search" element={<Search/>} />
      </Routes>
    </Router>
  );
}

export default App;
