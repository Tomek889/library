const dialog = document.querySelector('dialog');
const addBookButton = document.querySelector('#add-new-book');
const closeButton = document.querySelector('#close-button');
const submitButton = document.querySelector('#submit-button');
const form = document.querySelector('dialog form');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks(library) {
    const container = document.querySelector('.cards');
    container.innerHTML = '';

    for (const book of library) {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('p');
        const titleText = document.createTextNode(`Title: ${book.title}.`);
        title.appendChild(titleText);
        card.appendChild(title);

        const author = document.createElement('p');
        const authorText = document.createTextNode(`Author: ${book.author}.`);
        author.appendChild(authorText);
        card.appendChild(author);

        const pages = document.createElement('p');
        const pagesText = document.createTextNode(`Pages: ${book.pages}.`);
        pages.appendChild(pagesText);
        card.appendChild(pages);

        const read = document.createElement('p');
        const readText = document.createTextNode(`${book.read ? 'Already read.' : 'Not read yet.'}`);
        read.appendChild(readText);
        card.appendChild(read);

        const changeStatusButton = document.createElement('button');
        changeStatusButton.classList.add('status-button');
        const changeStatusButtonText = document.createTextNode(`Change Status`);
        changeStatusButton.appendChild(changeStatusButtonText);
        changeStatusButton.setAttribute('data-id', book.id);
        card.appendChild(changeStatusButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        const deleteButtonText = document.createTextNode(`Delete`);
        deleteButton.appendChild(deleteButtonText);
        deleteButton.setAttribute('data-id', book.id);
        card.appendChild(deleteButton);

        container.appendChild(card);
    }

    addDeleteEventListeners();
    addChangeStatusEventListeners();
}

function removeBookFromLibrary(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
    }
}

function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-button');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bookId = button.getAttribute('data-id');
            removeBookFromLibrary(bookId);
            displayBooks(myLibrary);
        });
    });
}

function changeStatus(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
    }
}

function addChangeStatusEventListeners() {
    const changeStatusButtons = document.querySelectorAll('.status-button');

    changeStatusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bookId = button.getAttribute('data-id');
            changeStatus(bookId);
            displayBooks(myLibrary);
        });
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#add-title').value.trim();
    const author = document.querySelector('#add-author').value.trim();
    const pages = document.querySelector('#add-pages').value.trim();
    const read = document.querySelector('#is-read').checked;
    addBookToLibrary(title, author, pages, read);
    form.reset();
    displayBooks(myLibrary);
    dialog.close();
});

addBookButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    form.reset();
    dialog.close();
});

