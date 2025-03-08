import { useState, useEffect } from "react";
import { registerWithEmail, loginWithGoogle, auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await registerWithEmail(email, password);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      handleAuthError(error.code); // Handle specific Firebase errors
    }
  };

  // Function to handle Firebase Authentication errors
  const handleAuthError = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setError("This email is already in use. Try logging in instead.");
        break;
      case "auth/invalid-email":
        setError("Invalid email format. Please enter a valid email.");
        break;
      case "auth/weak-password":
        setError("Password should be at least 6 characters long.");
        break;
      case "auth/network-request-failed":
        setError("Network error. Please check your internet connection.");
        break;
      default:
        setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>} {/* Display error message */}
      <input
        type="email"
        placeholder="Email"
        className="mb-2 border p-2 w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-2 border p-2 w-80"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp} className="bg-green-500 text-white px-3 py-1 mb-2 w-80">
        Sign Up
      </button>
      <button onClick={loginWithGoogle} className="bg-red-500 text-white px-3 py-1 w-80">
        Sign Up with Google
      </button>
      <p className="mt-2">
        Already have an account? <a href="/login" className="text-blue-600">Login</a>
      </p>
    </div>
  );
};

export default SignUp;
