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
// modals
addBook.addEventListener("click", toggleModal);
function toggleModal() {
	modal.classList.toggle("show");
}
closeModal.addEventListener("click", () => {
	clearValues();
	toggleModal();
});
submitButton.addEventListener("click", () => {
	isFormValid();
});
function isFormValid() {
	if (bookTitle.value && bookAuthor.value && bookPages.value) {
		addBookToLibrary();
		toggleModal();
		clearValues();
	} else {
		errorText.textContent = "*All fields must be filled";
	}
}
function clearValues() {
	bookTitle.value = "";
	bookAuthor.value = "";
	bookPages.value = "";
	errorText.textContent = "⠀";
	isRead.checked = false;
}
// create books

const library = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.readstatus = function (isRead, updateRead) {
	if (isRead) {
		updateRead.textContent = "Read";
		updateRead.classList.remove("not-read");
		return updateRead.textContent;
	} else {
		updateRead.classList.add("not-read");
		updateRead.textContent = "Not Read";
		return updateRead.textContent;
	}
};
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

function loopLibrary() {
	let index = -1;
	library.forEach((book) => {
		// creates elements for cards
		const cardContainer = document.querySelector(".card-container");
		const card = document.createElement("div");
		const removeCard = document.createElement("button");
		const cardInfo = document.createElement("div");
		const titleCard = document.createElement("div");
		const authorCard = document.createElement("div");
		const pagesCard = document.createElement("div");
		const readCard = document.createElement("button");

		card.dataset.indexNumber = `${index + 1}`;
		const bookIndex = Number(card.dataset.indexNumber);
		index++;
		// add class to elements
		cardInfo.classList.add("card-info");
		removeCard.classList.add("remove-card");

		titleCard.classList.add("title-card");
		authorCard.classList.add("author-card");
		pagesCard.classList.add("pages-card");
		readCard.classList.add("read-card");
		card.classList.add("card");

		// set text content
		removeCard.textContent = "❌";
		titleCard.textContent = book.title;
		authorCard.textContent = `by ${book.author}`;
		pagesCard.textContent = `${book.pages} pages`;

		// style intiial read
		if (book.read) {
			readCard.textContent = "Read";
			readCard.classList.remove("not-read");
		} else {
			readCard.classList.add("not-read");
			readCard.textContent = "Not Read";
		}
		// events
		readCard.addEventListener("click", () => {
			library[bookIndex].read = !library[bookIndex].read;
			readCard.textContent = library[bookIndex].readstatus(
				book.read,
				readCard
			);
		});

		removeAllBooks.addEventListener("click", () => {
			library.length = 0;
			cardContainer.innerHTML = "";
			toggleLibraryText.classList.remove("hide");
		});

		// append cards
		cardInfo.append(titleCard, authorCard, pagesCard, readCard);
		card.append(removeCard, cardInfo);
		cardContainer.append(card);
	});

	// listen to when deleted

	// then
}
