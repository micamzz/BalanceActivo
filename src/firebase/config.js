
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBs6rDA90h1jkvJ80JS-aBmMw0NEQZbLJY",
  authDomain: "balance-activo.firebaseapp.com",
  projectId: "balance-activo",
  storageBucket: "balance-activo.firebasestorage.app",
  messagingSenderId: "404462909981",
  appId: "1:404462909981:web:7826dde561eec0f6e864f4"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)