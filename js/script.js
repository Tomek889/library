const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read=false) {
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

        container.appendChild(card);
    }
}

const dialog = document.querySelector('dialog');
const addBookButton = document.querySelector('#add-new-book');
const closeButton = document.querySelector('#close-button');
const submitButton = document.querySelector('#submit-button');
const form = document.querySelector('dialog form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#add-title').value.trim();
    const author = document.querySelector('#add-author').value.trim();
    const pages = document.querySelector('#add-pages').value.trim();
    addBookToLibrary(title, author, pages);
    form.reset();
    displayBooks(myLibrary);
    dialog.close();
});

addBookButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});