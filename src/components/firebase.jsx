// src/components/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyAcj1QfCKoUadRzmMP2oF9cVKPbKgAw-70",
  authDomain: "verve-innovations.firebaseapp.com",
  projectId: "verve-innovations",
  storageBucket: "verve-innovations.appspot.com",
  messagingSenderId: "710418840373",
  appId: "1:710418840373:web:b01c25a4e16b4c6a662a7c"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const storage = getStorage(app); // Initialize Firebase Storage

export { auth, db, googleProvider, githubProvider, storage }; // Export all necessary components
  