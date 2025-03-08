import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaRegBell, FaPen, FaBars, FaTimes } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const dropdownRef = useRef(null);

  const getActiveTab = () => {
    if (location.pathname === "/") return "for-you";
    if (location.pathname === "/course") return "course";
    if (location.pathname === "/services") return "services";
    return "";
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDropdownOpen(false);
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  const submitSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="relative flex flex-col bg-white w-full shadow-sm">
      <div className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold font-serif cursor-pointer pr-30" onClick={() => navigate("/")}>Medium</h1>
          <div className="hidden sm:flex items-center bg-gray-100 px-3 py-2 rounded-full">
            <FaSearch className="text-gray-500 cursor-pointer" onClick={submitSearch} />
            <input type="text" value={searchQuery} onChange={handleSearch} onKeyDown={(e) => e.key === "Enter" && submitSearch()} placeholder="Search blogs..." className="bg-transparent outline-none ml-2 text-gray-600 placeholder-gray-400 w-64" />
          </div>
          <button className="sm:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <button className="flex items-center text-gray-600 hover:text-black" onClick={() => navigate("/write")}>
            <FaPen className="mr-1" /> Write
          </button>
          <FaRegBell className="text-gray-600 hover:text-black cursor-pointer" />
          {user ? (
            <button onClick={handleLogout} className="text-gray-600 hover:text-black">Logout</button>
          ) : (
            <>
              <button className="text-gray-600 hover:text-black" onClick={() => navigate("/login")}>Login</button>
              <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full" onClick={() => navigate("/signup")}>Sign Up</button>
            </>
          )}
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-4 py-4 border-t border-gray-200 ">
          <button className="text-gray-600 hover:text-black" onClick={() => navigate("/write")}>
            Write
          </button>
          {user ? (
            <button className="text-gray-600 hover:text-black" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button className="text-gray-600 hover:text-black" onClick={() => navigate("/login")}>Login</button>
              <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full" onClick={() => navigate("/signup")}>Sign Up</button>
            </>
          )}
        </div>
      )}
      <nav className="border-t border-gray-200 overflow-x-auto whitespace-nowrap px-9 py-4">
        <div className="flex space-x-7 text-gray-600 text-sm font-medium">
          <button onClick={() => navigate("/")} className={`${getActiveTab() === "for-you" ? "text-black font-bold border-b-2 border-black" : "hover:text-black"}`}>For You</button>
          <button onClick={() => navigate("/course")} className={`${getActiveTab() === "course" ? "text-black font-bold border-b-2 border-black" : "hover:text-black"}`}>Course</button>
          <button onClick={() => navigate("/services")} className={`${getActiveTab() === "services" ? "text-black font-bold border-b-2 border-black" : "hover:text-black"}`}>Services</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;