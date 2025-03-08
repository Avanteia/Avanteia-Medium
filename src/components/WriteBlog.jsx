import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { auth, db, storage } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle Image Upload and Preview
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show instant preview
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `blogImages/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // Update state with Firebase URL
      setImageUrl(url);
      setImage(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  // Handle Publishing Blog Post
  const handlePublish = async () => {
    if (!title || !description || !content || !imageUrl) {
      alert("Title, description, content, and image are required.");
      return;
    }

    if (!user) {
      alert("You need to be logged in to publish.");
      return;
    }

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        description,
        content,
        imageUrl,
        author: user.email,
        timestamp: serverTimestamp(),
      });

      alert("Blog published successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Failed to publish blog. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <header className="flex justify-between items-center pb-3 border-b border-gray-300">
        <h1 className="text-2xl font-serif text-gray-900">Medium</h1>
        <button 
          onClick={handlePublish} 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm transition">
          Publish
        </button>
        <FaBell className="text-gray-600 hover:text-black cursor-pointer text-lg" />
      </header>

      {/* Title Input */}
      <input
        type="text"
        placeholder="Title"
        className="w-full text-4xl font-bold outline-none mt-4 p-2 border-b border-gray-300 focus:border-gray-500 transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Description Input */}
      <input
        type="text"
        placeholder="Short Description..."
        className="w-full text-lg text-gray-600 outline-none mt-2 p-2 border-b border-gray-300 focus:border-gray-500 transition"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Image Upload */}
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        className="mt-4"
      />
      {imageUrl && <img src={imageUrl} alt="Preview" className="mt-4 w-full h-64 object-cover rounded-lg" />}

      {/* Content Input */}
      <textarea
        placeholder="Write your blog content here..."
        className="w-full min-h-[300px] mt-4 p-4 border border-gray-300 rounded-lg shadow-sm outline-none text-lg focus:border-gray-500 transition"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
};

export default WriteBlog;
