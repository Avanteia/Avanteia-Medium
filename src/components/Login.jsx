import { useState, useEffect } from "react";
import { loginWithEmail, loginWithGoogle, auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await loginWithEmail(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input type="email" placeholder="Email" className="mb-2 border p-2 w-80" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="mb-2 border p-2 w-80" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-3 py-1 mb-2 w-80">Login</button>
      <button onClick={loginWithGoogle} className="bg-red-500 text-white px-3 py-1 w-80">Login with Google</button>
      <p className="mt-2">Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a></p>
    </div>
  );
};

export default Login;
