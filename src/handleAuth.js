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
  query,
  where,
  getDocs,
} from "@firebase/firestore";
import app from "./firebase";
import { library, loopLibrary } from "./index";

const auth = getAuth(app);
const db = getFirestore(app);
const cardContainer = document.querySelector(".card-container");
const toggleLibraryText = document.querySelector(".library-info-container");

onAuthStateChanged(auth, async (user) => {
  if (user) {
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
    if (library.length) {
      toggleLibraryText.classList.add("hide");
    }
  } else {
    login.classList.add("active");
    logout.classList.remove("active");
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
