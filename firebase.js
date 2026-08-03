// Import the functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDmzIUU1_ytocfHNs4wnyL8coWVk76Cxz8",
  authDomain: "liens-z.firebaseapp.com",
  projectId: "liens-z",
  storageBucket: "liens-z.firebasestorage.app",
  messagingSenderId: "356236994136",
  appId: "1:356236994136:web:c81d3c2a7c54dffd85cc2d",
  measurementId: "G-91XMYR26ML"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export { collection, addDoc, getDocs, deleteDoc, updateDoc, doc };
