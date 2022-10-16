let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return read ? `${title} by ${author}, ${pages} pages, already read` : `${title} by ${author}, ${pages} pages, not read yet`
    }
}

Book.prototype.changeRead = function() {
    this.read = this.read === "Yes" ? "No" : "Yes";
    displayBooks();
}

function addBookToLibrary() {
    const form = document.querySelector('#book-form');
    const title = form.querySelector('#book-title').value;
    const author = form.querySelector('#book-author').value;
    const pages = form.querySelector('#book-pages').value;
    let read = form.querySelector('#read-book').checked;
    if (checkForm(title, author, pages)) {
        read = read ? "Yes" : "No";
        myLibrary.push(new Book(title, author, pages, read));
        form.reset();
        displayBooks();
    }
    else {
        alert("All fields required.");
    }
}

function removeBook(elem) {
    const i = elem.className;
    myLibrary.splice(i, 1);
    displayBooks();
}

function displayBooks() {
    const grid = document.querySelector('.grid-container');
    const oldGrid = document.querySelectorAll('.grid-item');
    for (item of oldGrid) {
        grid.removeChild(item);
    }

    for (let book of myLibrary) {
        let newBook = document.createElement('div');
        newBook.setAttribute('class','grid-item');

        const title = document.createElement('p');
        title.textContent = book.title;
        newBook.appendChild(title);

        const author = document.createElement('p');
        author.textContent = book.author;
        newBook.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = book.pages;
        newBook.appendChild(pages);

        const read = document.createElement('p');
        read.textContent = book.read;
        newBook.appendChild(read);

        const i = myLibrary.indexOf(book);
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('id', 'remove-button');
        removeButton.setAttribute('class', i);
        removeButton.setAttribute('onclick', 'removeBook(this)');
        newBook.appendChild(removeButton);

        const changeRead = document.createElement('button');
        changeRead.textContent = book.read === "Yes" ? "Read" : "Not Read";
        changeRead.setAttribute('id', 'change-read');
        changeRead.setAttribute('class', i);
        changeRead.addEventListener('click', () => {
            book.changeRead();
        });
        newBook.appendChild(changeRead);

        grid.appendChild(newBook);
    }
}

function openForm() {
    document.getElementById('form-container').style.display = "block";
}

function closeForm() {
    document.getElementById('form-container').style.display = "none";
}

function checkForm(title, author, pages) {
    if (!title || !author || !pages) {
        return false;
    }
    return true;
}