import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBOVYcPsnlrIRrYoe5QtCFA35vxOLMRDMc",
  authDomain: "talkbotix-5b4cb.firebaseapp.com",
  projectId: "talkbotix-5b4cb",
  storageBucket: "talkbotix-5b4cb.firebasestorage.app",
  messagingSenderId: "273918707823",
  appId: "1:273918707823:web:bc8dd3600294b0661de59a",
  measurementId: "G-7J8X51EMF6"
};

const app = !getApps.length? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);