// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-upload-firebase.firebaseapp.com",
  projectId: "mern-upload-firebase",
  storageBucket: "mern-upload-firebase.appspot.com",
  messagingSenderId: "246741303161",
  appId: "1:246741303161:web:fbd774411ce92058d3b9a8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

/*
  Explaining: 
  Initialize the Firebase app using the config object containing the credentials 
  and export it. 
  You’ll also export a reference to the storage service, 
  which is used to create references in your storage.
*/