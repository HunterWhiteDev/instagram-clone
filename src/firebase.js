import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD4lIBTedz2e1kmexFYfKjzab8Co2xd9ts",
  authDomain: "instagram-clone-ebcdf.firebaseapp.com",
  projectId: "instagram-clone-ebcdf",
  storageBucket: "instagram-clone-ebcdf.appspot.com",
  messagingSenderId: "62145786872",
  appId: "1:62145786872:web:d6e335861e0172a1355c0d",
  measurementId: "G-21F03KKLW9",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebase.storage();

export { db, auth, storage };
