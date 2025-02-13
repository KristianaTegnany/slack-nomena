import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDW2Kl00WP9iWKebOOfc5U4TPSq9Ovk7z8",
  authDomain: "slack-1975b.firebaseapp.com",
  databaseURL: "https://slack-1975b-default-rtdb.firebaseio.com",
  projectId: "slack-1975b",
  storageBucket: "slack-1975b.firebasestorage.app",
  messagingSenderId: "171182150111",
  appId: "1:171182150111:web:33de23dd60d005a9f8746a",
  measurementId: "G-K8LJQ223J2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app