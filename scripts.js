const addBook = document.querySelector("#add-book-id");
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close");
addBook.addEventListener("click", showModal);

function showModal() {
	modal.classList.toggle("show");
}

closeModal.addEventListener("click", hideModal);
function hideModal() {
	modal.classList.toggle("show");
}

const library = [];

function Book() {}

function addBookToLibrary() {}
