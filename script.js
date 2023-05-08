// Initial library
let myLibrary = [];

// Book constructor
function Book(title, author, pages, isRead) {
	this.title = title;
	this.author = author;
	this.pages = `${pages} pages`;
	this.isRead = isRead;
}

// DOM Elements
const readingList = document.querySelector(".book-cards-container");
const addBtn = document.querySelector(".addBtn");
const submitBtn = document.querySelector(".submit");
const mask = document.querySelector(".mask");

// DOM Methods
const toggleReadStatus = function (e) {
	const target = e.target.closest(".read-status");

	if (target) {
		const bookTitle =
			target.parentElement.parentElement.querySelector(
				".book-title"
			).textContent;
		const bookIndex = myLibrary.findIndex((book) => book.title === bookTitle);
		const thisBook = myLibrary[bookIndex];

		if (target.querySelector("p").textContent == "READ") {
			target.parentElement.parentElement.classList.remove("unread");
			target.parentElement.parentElement.classList.add("read");
			target.querySelector("p").textContent = "UNREAD";
			thisBook.isRead = "true";
		} else if (target.querySelector("p").textContent == "UNREAD") {
			target.parentElement.parentElement.classList.remove("read");
			target.parentElement.parentElement.classList.add("unread");
			target.querySelector("p").textContent = "READ";
			thisBook.isRead = "false";
		}
	}
};

const removeBook = function (e) {
	const target = e.target.closest(".removeBtn");

	if (target) {
		const bookTitle =
			target.parentElement.parentElement.querySelector(
				".book-title"
			).textContent;
		myLibrary.splice(
			myLibrary.findIndex((book) => book.title === bookTitle),
			1
		);
		refreshLibrary();
	}
};

// Create books then add to library
const addBookToLibrary = function (title, author, pages, isRead) {
	// Create new book using constructor
	newBook = new Book(title, author, pages, isRead);

	// Add it to library
	myLibrary.push(newBook);

	// Adding book to display
	displayBook(newBook);
};

// Adding book to display
const displayBook = function (Book) {
	const readClass = Book.isRead == "true" ? "read" : "unread";
	const buttonContent = Book.isRead == "true" ? "UNREAD" : "READ";

	const newBook = document.createElement("div");
	newBook.classList.add("card");
	newBook.classList.add(`${readClass}`);

	newBook.innerHTML = `
	<div class="card-info">
		<h3 class="book-title">${Book.title}</h3>
		<p class="book-author">📝 ${Book.author}</p><br>
		<p class="pages">📖 ${Book.pages}</p>
	</div>
	<div class="card-controls">
		<div class="read-status">
			<p>${buttonContent}</p>
		</div>
		<div class="removeBtn">
			<p>REMOVE</p>
		</div>
	</div>
	`;

	readingList.append(newBook);
};

const openModal = function (e) {
	if (!e.target.parentElement.classList.contains("active")) {
		e.target.parentElement.classList.toggle("active");
		mask.style.visibility = "visible";
	} else {
		e.target.parentElement.classList.toggle("active");
		mask.style.visibility = "hidden";
	}
};

const submitForm = function (e) {
	e.preventDefault();
	const title = bookTitle.value;
	const author = bookAuthor.value;
	const pages = bookPages.value;
	const isRead = readStatus.checked ? "true" : "false";

	addBookToLibrary(title, author, pages, isRead);
	document.querySelector("form").reset();
	addBtn.classList.remove("active");
	mask.style.visibility = "hidden";
};

// Clears all then renders updated library
const refreshLibrary = function () {
	readingList.innerHTML = ``;
	myLibrary.forEach((book) => {
		displayBook(book);
	});
};

// Event listeners
readingList.addEventListener("click", toggleReadStatus);
readingList.addEventListener("click", removeBook);
addBtn.addEventListener("click", openModal);
submitBtn.addEventListener("click", submitForm);
