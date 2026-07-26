import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyQxOldExt1TEDAzCK9G3J6BIUxOIEYH0",
  authDomain: "macro-coach-af4f0.firebaseapp.com",
  projectId: "macro-coach-af4f0",
  storageBucket: "macro-coach-af4f0.firebasestorage.app",
  messagingSenderId: "410504605978",
  appId: "1:410504605978:web:0b8485be135c1cc8017ca3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);