// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // ✅ Import auth

// Your config from Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyCAMBYLQV4UszJBFpzWNfMXJ2Ax3t1cbpE',
  authDomain: 'atlas-cinema-guru.firebaseapp.com',
  projectId: 'atlas-cinema-guru',
  storageBucket: 'atlas-cinema-guru.appspot.com',
  messagingSenderId: '704533741978',
  appId: '1:704533741978:web:1def992dbd6d2599543a23',
  measurementId: 'G-LWQJ4ZL9WK',
};

// Prevent reinitializing on hot reloads in dev
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app); // ✅ Export auth
