import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import auth from "./firebase";

onAuthStateChanged(auth, (user) => {
  if (user) {
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
    console.log(result);
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
