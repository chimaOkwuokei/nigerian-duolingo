// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0eQ0ZBvJoFD8Un7bOYNB3R3_e5vK8kl0",
  authDomain: "naija-duo-backend.firebaseapp.com",
  projectId: "naija-duo-backend",
  storageBucket: "naija-duo-backend.firebasestorage.app",
  messagingSenderId: "284507930860",
  appId: "1:284507930860:web:8e07f3c80d31f4e3e4e5c9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
