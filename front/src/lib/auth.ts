import { rootURL } from "@/api/main";
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveSession = (userData: any) => {
  if (userData.uid) localStorage.setItem("user", JSON.stringify(userData))
}

export const getSession = () => {
  const data = localStorage.getItem("user")
  return data ? JSON.parse(data) : undefined;
}

export const logout = () => {
  localStorage.removeItem("user")
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    return await fetch(`${rootURL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).then(res => res.json());
  } catch {
    return "Google Sign-In Error";
  }
};

export const signInWithApple = async () => {
  const provider = new OAuthProvider("apple.com");
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    return await fetch(`${rootURL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).then(res => res.json());
  } catch {
    return "Apple Sign-In Error";
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return await fetch(`${rootURL}/auth/signin/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).then(res => res.json());
  } catch {
    return "Email Sign-In Error";
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    return fetch(`${rootURL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json());
  } catch {
    return "There is something wrong"
  }
};
