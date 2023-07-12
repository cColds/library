import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from "@firebase/firestore";
import app from "./firebase";
import { library, loopLibrary } from "./index";

const auth = getAuth(app);
const db = getFirestore(app);
const cardContainer = document.querySelector(".card-container");
const toggleLibraryText = document.querySelector(".library-info-container");
const accountInfo = document.querySelector(".account-info");
const profilePic = document.querySelector(".profile-pic");
const username = document.querySelector(".username");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    library.length = 0;
    const docRef = doc(db, `users/${user.uid}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) await setDoc(doc(db, docRef.path), {});
    const booksRef = collection(db, `users/${user.uid}/books`);
    const querySnapshot = await getDocs(booksRef);
    querySnapshot.forEach((doc) => {
      library.push(doc.data());
    });
    loopLibrary();
    login.classList.remove("active");
    logout.classList.add("active");
    accountInfo.classList.add("active");

    if (library.length) {
      toggleLibraryText.classList.add("hide");
    }
    profilePic.src = user.photoURL;
    username.textContent = user.displayName;
    console.log(user);
  } else {
    login.classList.add("active");
    logout.classList.remove("active");
    accountInfo.classList.remove("active");
    library.length = 0;
    cardContainer.innerHTML = "";
    toggleLibraryText.classList.remove("hide");
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
