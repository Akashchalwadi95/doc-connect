import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9SA7vdwl1QeFAOCyVo4tVGbTowr7yQgc",
  authDomain: "doc-connect-1e181.firebaseapp.com",
  projectId: "doc-connect-1e181",
  storageBucket: "doc-connect-1e181.firebasestorage.app",
  messagingSenderId: "822725153261",
  appId: "1:822725153261:web:cd6166b5b5c2997f7f57e4",
  measurementId: "G-90W561SFK7"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);