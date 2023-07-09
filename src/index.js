import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "./styles.css";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAEVQPK27XMkodcV4MVzAngFdnj3TeFYYk",
  authDomain: "library-ea366.firebaseapp.com",
  projectId: "library-ea366",
  storageBucket: "library-ea366.appspot.com",
  messagingSenderId: "1054822464232",
  appId: "1:1054822464232:web:e078150f99bbb03dc8a75d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const addBook = document.querySelector("#add-book-id");
const removeAllBooks = document.querySelector(".remove-all");
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close");
const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPages = document.querySelector(".book-pages");
const isRead = document.querySelector(".book-read");
const errorText = document.querySelector(".error");
const submitButton = document.querySelector(".submit-button");
const toggleLibraryText = document.querySelector(".library-info-container");

function toggleModal() {
  modal.classList.toggle("show");
}

function isFormValid() {
  return (
    bookTitle.validity.valid &&
    bookAuthor.validity.valid &&
    bookPages.validity.valid
  );
}

function clearValues() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  errorText.textContent = "⠀";
  isRead.checked = false;
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
  clearValues();
});

closeModal.addEventListener("click", toggleModal);
submitButton.addEventListener("click", () => {
  if (!isFormValid()) {
    errorText.textContent = "*All fields must be filled";
    return;
  }

  addBookToLibrary();
  toggleModal();
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

function addBookToLibrary() {
  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    isRead.checked
  );
  library.push(book);
  toggleLibraryText.classList.add("hide");
  loopLibrary();
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

    readCard.addEventListener("click", (e) => {
      const bookIndex = getBookIndex(e);

      library[bookIndex].read = !library[bookIndex].read;
      updateReadCardClassNameAndTextContent(book.read, readCard);
    });

    removeCard.addEventListener("click", (e) => {
      const bookIndex = getBookIndex(e);

      library.splice(bookIndex, 1);
      card.remove();
      card.innerHTML = "";

      if (!library.length) toggleLibraryText.classList.remove("hide");

      loopLibrary();
    });

    removeAllBooks.addEventListener("click", () => {
      library.length = 0;
      cardContainer.innerHTML = "";
      toggleLibraryText.classList.remove("hide");
    });

    cardInfo.append(titleCard, authorCard, pagesCard, readCard);
    card.append(removeCard, cardInfo);
    cardContainer.append(card);
  });
}
