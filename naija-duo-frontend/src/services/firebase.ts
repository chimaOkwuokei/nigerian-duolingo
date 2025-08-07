// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

 const API_KEY = import.meta.env.API_KEY;
 const AUTH_DOMAIN = import.meta.env.AUTH_DOMAIN;
 const PROJECT_ID = import.meta.env.PROJECT_ID;
 const STORAGE_BUCKET = import.meta.env.STORAGE_BUCKET;
 const MESSAGING_SENDER_ID = import.meta.env.MESSAGING_SENDER_ID;
 const APP_ID = import.meta.env.APP_ID;

 // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket:STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId:APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
