import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPjQNZJCnynkq1WMofEjgHzuEJRhRT6Vg",
  authDomain: "ecommerce-store-ec229.firebaseapp.com",
  projectId: "ecommerce-store-ec229",
  storageBucket: "ecommerce-store-ec229.appspot.com",
  messagingSenderId: "196239413333",
  appId: "1:196239413333:web:1b8502e73a60b8cfa9c4dc"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)

export { db , auth }