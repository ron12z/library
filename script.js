// Initial library
let myLibrary = [];

// Book constructor
function Book(title, author, pages, isRead) {
	this.title = title;
	this.author = author;
	this.pages = `${pages} pages`;
	this.isRead = isRead;
}

// Create books then add to library
const addBookToLibrary = function (title, author, pages, isRead) {
	// Create new book using constructor
	newBook = new Book(title, author, pages, isRead);

	// Add it to library
	myLibrary.push(newBook);

	// Update displayed library
};
