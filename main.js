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
    title.classList.add('title');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('span');
    const check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.setAttribute('data-index', myLibrary.indexOf(book));
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-btn');

    title.innerText = `${book.title}`;
    author.innerText = `${book.author}`;
    pages.innerText = `${book.pages} pages`;
    read.innerText = ` Read`;
    removeButton.innerText = 'Remove';
    if (book.read) check.setAttribute('checked', 'true');
    
    container.lastChild.append(title, author, pages, check, read, removeButton);
    container.lastChild.classList.add('card');
    removeButton.setAttribute('data-index', myLibrary.indexOf(book));

    if (book.read) {
      container.lastChild.classList.add('read');
    } else {
      container.lastChild.classList.add('unread');
    }
  }

  let removeButtons = document.querySelectorAll('.remove-btn');

  removeButtons.forEach(btn => {
    btn.addEventListener('click', updateLibrary);
  })

  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', e => {
    myLibrary[e.target.dataset.index].read = e.target.checked;
    updateLibrary();

  })
})
}

showLibrary();

const addBook = document.getElementById('add-book');
const form = document.querySelector('form');


const newBookBtn = document.getElementById('add-new-book');
const newTitle = document.getElementById('title');
const newAuthor = document.getElementById('author');
const newPages = document.getElementById('pages');
const haveRead = document.getElementById('read');
const haventRead = document.getElementById('unread');

addBook.addEventListener('click', (e) => {  
  if (e.target.textContent == 'Add Book') {
    newTitle.value = '';
    newAuthor.value = '';
    newPages.value = '';
    e.target.textContent = 'Hide';
    form.style.display = 'grid';
  } else {
    form.style.display = 'none';
    e.target.textContent = 'Add Book'
  }
})

let newBook;

newBookBtn.addEventListener('click', () => {
  if (!newTitle.value) {
    alert('Please enter a book title');
    return;
  }
  if (haveRead.checked) {
    newBook = new Book(newTitle.value, newAuthor.value, newPages.value, true);
  } else {
    newBook = new Book(newTitle.value, newAuthor.value, newPages.value, false);
  }
  myLibrary.push(newBook);
  updateLibrary(false);

})

function updateLibrary(e) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  if (e) myLibrary.splice(e.target.dataset.index, 1);
  showLibrary();
}

const sortBtn = document.querySelector('#sort-btn');
const sortBy = document.querySelector('#sort');

sortBtn.addEventListener('click', e => {
  sortBooks(sortBy.selectedOptions[0].value);
})

function sortBooks(criteria) {
  myLibrary.sort((a,b) => {
    if (b[criteria] < a[criteria]) return 1;
    else return -1;
  })
  updateLibrary();
}