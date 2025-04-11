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
        console.log(book)
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

// testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 245, false);
addBookToLibrary("Phil Knight", "Shoe Dog", 395, true);
addBookToLibrary("Harry Potter", "J.K. Rowling", 45, true);
displayBooks(myLibrary);