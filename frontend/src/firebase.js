import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-17dc3.firebaseapp.com",
  projectId: "mern-17dc3",
  storageBucket: "mern-17dc3.appspot.com",
  messagingSenderId: "362514596120",
  appId: "1:362514596120:web:d53f50145699ff25ad5e6d",
  measurementId: "G-H3Y0RSBZB3"
};
export const app = initializeApp(firebaseConfig);
