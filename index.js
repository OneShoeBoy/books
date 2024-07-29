const myLibrary = [];

function Book(title, author, pages, read, id) {
  this.id = id
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// --- Test data ----
const theHobbit = new Book('The Hobbit', 'JRR Tolkien', '295', false, 0);
const theEyeOfTheWorld = new Book('The Eye Of The World', 'Robert Jordan', '814', true, 1)

myLibrary.push(theHobbit);
myLibrary.push(theEyeOfTheWorld);
// ------------------

Book.prototype.switchRead = function (item) {
  item.read = !item.read;
  return item.read;
}

function addReadButtonHandler() {
  const readButton = document.querySelectorAll('#readButton');
  readButton.forEach((button) => {
    button.addEventListener('click', () => {

      const id = Number(button.dataset.id);

      myLibrary.forEach((item, index) => {

        if (item.id === id) {
          console.log(myLibrary);
          item.read = !item.read;
          console.log(`${item.title}: ${item.read}`);
          const elementToChange = document.querySelector(`[data-id='${item.id}'] > .bookRead`)
          elementToChange.textContent = `Read: ${item.read}`;
          return;
        }
      })
      console.log(myLibrary);
    })
  })
}


function addDeleteButtonHandler() {

  const deleteBookBtn = document.querySelectorAll('#deleteBookBtn');
  deleteBookBtn.forEach((button) => {

    button.addEventListener('click', () => {

      const id = Number(button.dataset.id);

      myLibrary.forEach((item, index) => {

        if (item.id === id) {
          myLibrary.splice(index, 1);
          console.log(myLibrary);
          const elementToRemove = document.querySelector(`[data-id='${item.id}']`);
          elementToRemove.remove();
          return;

        }
      })
    })
  })
}

function renderBookCard(data) {
  const bookContainer = document.getElementById('bookContainer');
  const bookCard = document.createElement('div');
  bookCard.classList.toggle('bookCard');
  bookCard.dataset.id = data.id;

  bookContainer.appendChild(bookCard);

  const title = document.createElement('div');
  const author = document.createElement('div');
  const pages = document.createElement('div');
  const read = document.createElement('div');
  const deleteBookBtn = document.createElement('button');
  const readButton = document.createElement('button');

  bookCard.appendChild(title);
  title.classList.toggle('bookTitle');

  bookCard.appendChild(author);
  author.classList.toggle('bookAuthor');

  bookCard.appendChild(pages);
  pages.classList.toggle('bookPages');

  bookCard.appendChild(read);
  read.classList.toggle('bookRead');

  bookCard.appendChild(readButton);
  readButton.classList.toggle('readButton');
  readButton.setAttribute('id', 'readButton');
  readButton.dataset.id = data.id;

  bookCard.appendChild(deleteBookBtn);
  deleteBookBtn.classList.toggle('deleteBookBtn');
  deleteBookBtn.setAttribute('id', 'deleteBookBtn');
  deleteBookBtn.dataset.id = data.id;

  title.textContent = `Title: ${data.title}`;
  author.textContent = `Author: ${data.author}`;
  pages.textContent = `Pages: ${data.pages}`;
  read.textContent = `Read: ${data.read}`;
  readButton.textContent = `Toggle read`;
  deleteBookBtn.textContent = 'Remove book';

}



function displayBooks(library) {

  if (library.length) {
    for (i = 0; i < library.length; i++) {
      renderBookCard(library[i]);
    }
  } else {
    renderBookCard(library);
  }

  addDeleteButtonHandler();
  addReadButtonHandler();

}

function addBookToLibrary() {
  const newBook = new Book();

  newBook.title = document.getElementById('title').value;
  newBook.author = document.getElementById('author').value;
  newBook.pages = document.getElementById('pages').value;
  newBook.id = myLibrary.length;

  if (document.getElementById('readTrue').checked) {
    newBook.read = true;
  } else if (document.getElementById('readFalse').checked) {
    newBook.read = false;
  }

  myLibrary.push(newBook);
  const newBookIndex = myLibrary.indexOf(newBook);
  displayBooks(myLibrary[newBookIndex])
}


// Initial render
displayBooks(myLibrary);

//Initialise modal selector
const formContainer = document.getElementById('formContainer');

const newBookBtn = document.getElementById('newBookBtn');
newBookBtn.addEventListener('click', () => {
  formContainer.showModal();

})

const closeModalBtn = document.getElementById('closeModalBtn');
closeModalBtn.addEventListener('click', () => {
  formContainer.close();
})

const addBook = document.getElementById('addBook');
addBook.addEventListener('click', (event) => {
  event.preventDefault();
  addBookToLibrary();
  formContainer.close();
})
