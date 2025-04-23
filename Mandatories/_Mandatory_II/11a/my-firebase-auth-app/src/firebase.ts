import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBev21EzkM0dWThkpaRk0fy2rImhEKRWLQ",
  authDomain: "authreact-84b5f.firebaseapp.com",
  projectId: "authreact-84b5f",
  storageBucket: "authreact-84b5f.firebasestorage.app",
  messagingSenderId: "1022297343005",
  appId: "1:1022297343005:web:aac5d2b05a8af2f9d532f4",
  measurementId: "G-3J2Y7S91W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
