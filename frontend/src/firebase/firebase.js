// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEchuF9HsuX2cb71uule1UJneTNNCLSoE",
  authDomain: "task-manager-db611.firebaseapp.com",
  projectId: "task-manager-db611",
  storageBucket: "task-manager-db611.firebasestorage.app",
  messagingSenderId: "794429058119",
  appId: "1:794429058119:web:8524c3d98aa45428281562"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)