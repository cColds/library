const addBook = document.querySelector("#add-book-id");
const modal = document.querySelector(".modal-container");
const closeModal = document.querySelector(".close");
const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPages = document.querySelector(".book-pages");
const checkbox = document.querySelector(".book-read");
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
	errorText.textContent = "";
	checkbox.checked = false;
}

// create books

const library = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.readstatus = function (readCard, readCardClass, readButton) {
	//library
	const num = library.length - 1;
	if (!readCardClass.classList.toString().startsWith("card"))
		readCardClass.classList.add(`card-${num + 1}`);

	if (library[library.length - 1].read) {
		readCard = "Read";
		readCardClass.classList.remove("not-read");
		return readCard;
	} else {
		readCard = "Not Read";
		readCardClass.classList.add("not-read");
		return readCard;
	}
};

function addBookToLibrary() {
	const book = new Book(
		bookTitle.value,
		bookAuthor.value,
		bookPages.value,
		checkbox.checked
	);
	library.push(book);
	toggleLibraryText.classList.add("hide");
	addCard(book.title, book.author, bookPages.value);
}

function addCard(title, author, pages) {
	const cardContainer = document.querySelector(".card-container");
	const card = document.createElement("div");
	const removeCard = document.createElement("button");
	const cardInfo = document.createElement("div");
	const titleCard = document.createElement("div");
	const authorCard = document.createElement("div");
	const pagesCard = document.createElement("div");
	const readCard = document.createElement("button");
	cardInfo.classList.add("card-info");
	removeCard.classList.add("remove-card");
	titleCard.classList.add("title-card");
	authorCard.classList.add("author-card");
	pagesCard.classList.add("pages-card");
	readCard.classList.add("read-card");

	removeCard.textContent = "❌";
	titleCard.textContent = title;
	authorCard.textContent = `by ${author}`;
	pagesCard.textContent = `${pages} pages`;
	readCard.textContent = library[library.length - 1].readstatus(
		readCard.textContent,
		readCard
	);
	// console.log(e.target.classList[1])
	readCard.onclick = (e) => {
		if (e.target.classList[2] == "not-read") {
			e.target.textContent = "Read";
			e.target.classList.remove("not-read");
		} else {
			e.target.classList.add("not-read");
			e.target.textContent = "Not Read";
		}
	};
	cardInfo.append(titleCard, authorCard, pagesCard, readCard);
	card.append(removeCard, cardInfo);
	card.classList.add("card");
	cardContainer.append(card);
}
