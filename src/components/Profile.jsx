import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";

const Profile = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const savedBlogIds = userSnap.data().savedBlogs || [];

          if (savedBlogIds.length === 0) {
            setSavedBlogs([]);
            return;
          }

          const blogsRef = collection(db, "blogs");
          const fetchedBlogs = [];

          for (const blogId of savedBlogIds) {
            const blogDoc = await getDoc(doc(blogsRef, blogId));
            if (blogDoc.exists()) {
              fetchedBlogs.push({ id: blogId, ...blogDoc.data() });
            }
          }

          setSavedBlogs(fetchedBlogs);
        }
      } catch (error) {
        console.error("Error fetching saved blogs:", error);
      }
    };

    fetchSavedBlogs();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex items-center space-x-4">
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{user?.displayName || "User"}</h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-6">Saved Blogs</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedBlogs.length > 0 ? (
          savedBlogs.map((blog) => (
            <Link to={`/blog/${blog.id}`} key={blog.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              {blog.imageUrl && (
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-40 object-cover rounded-lg" />
              )}
              <h3 className="font-semibold mt-2">{blog.title}</h3>
              <p className="text-sm text-gray-600">{blog.description.substring(0, 80)}...</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No saved blogs yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
