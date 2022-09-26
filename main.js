function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`
  }
}

const animalFarm = new Book('Animal Farm', 'George Orwell', 218, true);
const wolfHall = new Book('Wolf Hall', 'Hilary Mantel', 673, false);
const eastOfEden = new Book('East of Eden', 'John Steinbeck', 843, true);
const warAndPeace = new Book('War and Peace', 'Leo Tolstoy', 1432, false);
const foundation = new Book('Foundation', 'Isaac Asimov', 342, true);
const theOutsider = new Book('The Outsider', 'Albert Camus', 287, true);

let myLibrary = [animalFarm, wolfHall, eastOfEden, warAndPeace, foundation, theOutsider];
const container = document.querySelector('.container');


function showLibrary() {

  const card = document.createElement('div');

  for (let book of myLibrary) {
    console.dir(myLibrary);
    container.appendChild(card.cloneNode());
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('p');
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-btn');

    title.innerText = `Title: ${book.title}`;
    author.innerText = `Author: ${book.author}`;
    pages.innerText = `Pages: ${book.pages}`;
    read.innerText = `${book.read ? 'Read' : 'Not Read Yet'}`;
    removeButton.innerText = 'Remove';
    
    container.lastChild.append(title, author, pages, read, removeButton);
    container.lastChild.classList.add('card');
    removeButton.setAttribute('data-index', myLibrary.indexOf(book));

    if (book.read) {
      container.lastChild.classList.add('read');
    } else {
      container.lastChild.classList.add('unread');
    }
  }

  let removeButtons = document.querySelectorAll('.remove-btn');

  // removeButtons.forEach(btn => {
  //   btn.addEventListener('click', e => {
  //     while (container.firstChild) {
  //       container.removeChild(container.firstChild);
  //     }
  //     myLibrary.splice(e.target.dataset.index, 1);
  //     showLibrary();
  //   })
  // })
  removeButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      myLibrary.splice(e.target.dataset.index, 1);
      showLibrary();
    })
  })
}

showLibrary();

const addBook = document.getElementById('add-book');
const form = document.querySelector('form');
console.log(addBook);
addBook.addEventListener('click', (e) => {
  console.log(e);
  form.style.display = 'grid';

})

const newBookBtn = document.getElementById('add-new-book');
const newTitle = document.getElementById('title');
const newAuthor = document.getElementById('author');
const newPages = document.getElementById('pages');
const haveRead = document.getElementById('read');
newBookBtn.addEventListener('click', () => {
  let newBook = new Book(newTitle.value, newAuthor.value, newPages.value, haveRead.checked);
  console.log(newBook);
  myLibrary.push(newBook);
  haveRead.setAttribute('checked', '');
  updateLibrary(false);

})

function updateLibrary(e) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  if (e) myLibrary.splice(e.target.dataset.index, 1);
  showLibrary();
}
