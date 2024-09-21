import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCO2ao6WGcI6OkE5ccnPtwToKeG9w1NzyU",
  authDomain: "treinosplus.firebaseapp.com",
  projectId: "treinosplus",
  storageBucket: "treinosplus.appspot.com",
  messagingSenderId: "986271348325",
  appId: "1:986271348325:web:f9d5995d3b450f53b5b88c"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)

export {db}