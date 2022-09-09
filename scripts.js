const addBook = document.querySelector("#add-book-id");
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close");
const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPages = document.querySelector(".book-pages");
const checkbox = document.querySelector(".book-read");
const errorText = document.querySelector(".error");
const submitButton = document.querySelector(".submit-button");
addBook.addEventListener("click", showModal);

function showModal() {
	modal.classList.toggle("show");
}

closeModal.addEventListener("click", () => {
	clearValues();
	hideModal();
});

function hideModal() {
	modal.classList.toggle("show");
}

function isFormValid() {
	if (bookTitle.value && bookAuthor.value && bookPages.value) {
		hideModal();
		clearValues();
	} else errorText.textContent = "*All fields must be filled";
}

function clearValues() {
	bookTitle.value = "";
	bookAuthor.value = "";
	bookPages.value = "";
	errorText.textContent = "";
	checkbox.checked = false;
}

submitButton.addEventListener("click", isFormValid);

const library = [];

function Book() {}

function addBookToLibrary() {}
