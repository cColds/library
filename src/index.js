import "./handleAuth";
import "./styles/index.css";
import "./styles/modal.css";
import "./styles/library.css";

import app from "./firebase";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import auth from "./handleAuth";

const db = getFirestore(app);

const addBook = document.querySelector(".add-book");
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close");
const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPages = document.querySelector(".book-pages");
const isRead = document.querySelector(".book-read");
const bookForm = document.querySelector(".book-form");
const toggleLibraryText = document.querySelector(".library-info-container");

function toggleModal() {
  modal.classList.toggle("show");
}

function updateReadCardClassNameAndTextContent(bookIsRead, readCard) {
  if (bookIsRead) {
    readCard.textContent = "Read";
    readCard.classList.remove("not-read");
  } else {
    readCard.classList.add("not-read");
    readCard.textContent = "Not Read";
  }
}

addBook.addEventListener("click", () => {
  toggleModal();
  bookForm.reset();
});

closeModal.addEventListener("click", toggleModal);
bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addBookToLibrary();
  toggleModal();
  loopLibrary();
});

const library = [];
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

async function addBookToLibrary() {
  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    isRead.checked
  );

  try {
    const uid = auth.currentUser.uid;
    const booksRef = doc(collection(db, `users/${uid}/books`));
    const newBookToAdd = Object.assign({}, book, { id: booksRef.id });
    await setDoc(booksRef, newBookToAdd);
    library.push(newBookToAdd);
    console.log("Document written with ID: ", booksRef.id);
  } catch (e) {
    console.error(e);
    library.push(book);
  }
  console.log(library);
  toggleLibraryText.classList.add("hide");
}

function getBookIndex(e) {
  const { indexNumber } = e.target.closest("[data-index-number]").dataset;
  return Number(indexNumber);
}

function loopLibrary() {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";
  let index = -1;

  library.forEach((book) => {
    const card = document.createElement("div");
    const removeCard = document.createElement("button");
    const cardInfo = document.createElement("div");
    const titleCard = document.createElement("div");
    const authorCard = document.createElement("div");
    const pagesCard = document.createElement("div");
    const readCard = document.createElement("button");

    card.dataset.indexNumber = `${(index += 1)}`;

    cardInfo.classList.add("card-info");
    removeCard.classList.add("remove-card");

    titleCard.classList.add("title-card");
    authorCard.classList.add("author-card");
    pagesCard.classList.add("pages-card");
    readCard.classList.add("read-card");
    card.classList.add("card");

    removeCard.textContent = "❌";
    titleCard.textContent = book.title;
    authorCard.textContent = `by ${book.author}`;
    pagesCard.textContent = `${book.pages} pages`;
    updateReadCardClassNameAndTextContent(book.read, readCard);

    readCard.addEventListener("click", async (e) => {
      const bookIndex = getBookIndex(e);
      const { uid } = auth.currentUser;
      const booksRef = doc(db, `users/${uid}/books/${library[bookIndex].id}`);
      const toggleRead = !library[bookIndex].read;
      await updateDoc(booksRef, {
        read: toggleRead,
      });

      library[bookIndex].read = toggleRead;
      console.log("Document updated with ID: ", booksRef.id);
      updateReadCardClassNameAndTextContent(book.read, readCard);
    });

    removeCard.addEventListener("click", async (e) => {
      const bookIndex = getBookIndex(e);

      const { uid } = auth.currentUser;
      const booksRef = doc(db, `users/${uid}/books/${library[bookIndex].id}`);
      await deleteDoc(booksRef);
      console.log("Document deleted with ID: ", booksRef.id);
      library.splice(bookIndex, 1);
      card.remove();
      card.innerHTML = "";
      if (!library.length) toggleLibraryText.classList.remove("hide");

      loopLibrary();
    });

    cardInfo.append(titleCard, authorCard, pagesCard, readCard);
    card.append(removeCard, cardInfo);
    cardContainer.append(card);
  });
}

export { library, loopLibrary };
