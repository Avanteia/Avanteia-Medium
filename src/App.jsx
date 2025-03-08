import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import Feed from "./components/Feed";
import BlogDetails from "./components/BlogDetails";
import WriteBlog from "./components/WriteBlog";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Course from "./pages/Course"; // Import Course Page
import ServicesPage from "./pages/ServicesPage";
import SearchResults from "./pages/SearchResults"; 


function App() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/write" element={user ? <WriteBlog /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} /> {/* FIX: Capitalized "Profile" */}
        <Route path="/course" element={<Course />} /> {/* Route for Courses */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/search" element={<SearchResults />} /> 


      </Routes>
    </Router>
  );
}

export default App;
