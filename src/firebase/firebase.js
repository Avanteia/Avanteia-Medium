
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

// 🔴 Replace with your actual Firebase project configuration!
const firebaseConfig = {
  apiKey: "AIzaSyBVjVpzGK-pMGpCZ9zxPNPPpKRXS7VldP4",
  authDomain: "medium-blog-32428.firebaseapp.com",
  projectId: "medium-blog-32428",
  storageBucket: "medium-blog-32428.firebasestorage.app",
  messagingSenderId: "837937569550",
  appId: "1:837937569550:web:2f2fa589e59ce91d26415f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
const storage = getStorage(app); 
const googleProvider = new GoogleAuthProvider();

// Function to Register with Email
const registerWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save user to Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: new Date(),
  });

  return user;
};

// Function to Login with Email
const loginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Function to Login with Google
const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Save user to Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: new Date(),
  });

  return user;
};

// Function to Logout
const logout = async () => {
  await signOut(auth);
};

// ✅ Export all necessary services
export { auth, db, storage, registerWithEmail, loginWithEmail, loginWithGoogle, logout }