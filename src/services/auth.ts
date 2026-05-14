import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const register = async (email:string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // default role = user
    await setDoc(doc(db, "users", res.user.uid), {
        email,
        role: "user"
    });
}

import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (email: string, password: string) => {
  const res = await signInWithEmailAndPassword(auth, email, password);

  const snap = await getDoc(doc(db, "users", res.user.uid));

  if (!snap.exists()) throw new Error("User tidak ditemukan");

  return snap.data(); // { email, role }
};