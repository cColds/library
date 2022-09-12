const addBook = document.querySelector("#add-book-id");
const removeAllBooks = document.querySelector(".remove-all");
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

function Book(title, author, pages, read, id) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = id;
}

Book.prototype.readstatus = function (
	readCard,
	readCardClass,
	readButton,
	bookNumber
) {
	if (readButton) {
		if (
			!readCard &&
			!readCardClass &&
			readButton.classList.contains("not-read")
		) {
			readButton.textContent = "Read";
			readButton.classList.remove("not-read");
			library[bookNumber].read = true;
			return;
		} else if (!readCard && !readCardClass) {
			readButton.classList.add("not-read");
			readButton.textContent = "Not Read";
			library[bookNumber].read = false;
			return;
		}
	}
	const num = library.length - 1;
	if (!readCardClass.classList.toString().startsWith("card") && !readButton)
		readCardClass.classList.add(`card-${num + 1}`);

	if (library[library.length - 1].read && !readButton) {
		readCard = "Read";
		readCardClass.classList.remove("not-read");
		return readCard;
	} else if (!readButton) {
		readCard = "Not Read";
		readCardClass.classList.add("not-read");
		return readCard;
	}
};
function addBookToLibrary() {
	bookRead = checkbox.checked;
	let id = library.length;
	const book = new Book(
		bookTitle.value,
		bookAuthor.value,
		bookPages.value,
		bookRead,
		id
	);
	library.push(book);
	toggleLibraryText.classList.add("hide");
	loopLibrary(id);
}

function loopLibrary(id) {
	let index = 1;
	for (const book of library) {
		if (index !== library.length) {
			index++;
			continue;
		}
		addCard(book.title, book.author, bookPages.value, bookRead, id);
	}
}

function addCard(title, author, pages, read, identifier) {
	// creates elements for cards
	const cardContainer = document.querySelector(".card-container");
	const card = document.createElement("div");
	const removeCard = document.createElement("button");
	const cardInfo = document.createElement("div");
	const titleCard = document.createElement("div");
	const authorCard = document.createElement("div");
	const pagesCard = document.createElement("div");
	const readCard = document.createElement("button");

	// adds class to elements
	cardInfo.classList.add("card-info");
	removeCard.classList.add("remove-card");
	titleCard.classList.add("title-card");
	authorCard.classList.add("author-card");
	pagesCard.classList.add("pages-card");
	readCard.classList.add("read-card");
	card.classList.add("card");
	card.classList.add(`${identifier}`);
	// adds contents elements
	removeCard.textContent = "❌";
	titleCard.textContent = title;
	authorCard.textContent = `by ${author}`;
	pagesCard.textContent = `${pages} pages`;
	readCard.textContent = library[library.length - 1].readstatus(
		readCard.textContent,
		readCard
	);

	// events
	readCard.onclick = (e) => {
		library[0].readstatus("", "", e.target, identifier);
		readCard.setAttribute("id", identifier);
	};

	removeCard.addEventListener("click", () => {
		library.splice(identifier, 1);
		card.remove();
		card.innerHTML = "";
	});

	removeAllBooks.addEventListener("click", () => {
		library.length = 0;
		cardContainer.innerHTML = "";
	});

	// append cards
	cardInfo.append(titleCard, authorCard, pagesCard, readCard);
	card.append(removeCard, cardInfo);
	cardContainer.append(card);
}
