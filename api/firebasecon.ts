// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXA5n1-Wa3W2odm2mvFRBMuJBhGEdDgUE",
  authDomain: "finalprojectweb-88ac1.firebaseapp.com",
  projectId: "finalprojectweb-88ac1",
  storageBucket: "finalprojectweb-88ac1.appspot.com",
  messagingSenderId: "621262388156",
  appId: "1:621262388156:web:c9a844ff3fd383d603c9b9",
  measurementId: "G-WBXL3CTJS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);