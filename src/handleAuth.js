import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  getAuth,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "@firebase/firestore";
import app from "./firebase";

const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, `users/${user.uid}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) await setDoc(doc(db, docRef.path), {});
    login.classList.remove("active");
    logout.classList.add("active");
  } else {
    login.classList.add("active");
    logout.classList.remove("active");
  }
});

const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
async function handleLogin() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("Logged in with result:", result);
  } catch (error) {
    console.error(error);
  }
}

async function handleLogout() {
  try {
    await signOut(auth);
    login.classList.add("active");
    logout.classList.remove("active");
  } catch (error) {
    console.error(error);
  }
}

login.addEventListener("click", handleLogin);
logout.addEventListener("click", handleLogout);
export default auth;
