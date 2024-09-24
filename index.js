let allBooks = [];

function $(selector) {
  return document.querySelector(selector);
}

function createStructure() {
  return `
  <header>
     <h1>Reading List</h1>
  </header>`;
}

function createTable() {
  return `
   <form id="booksForm">
     <table id="booksTable">
      <thead>
        <tr>
          <th>No</th>
          <th>Book name</th>
          <th>Book author</th>
          <th>Pages</th>
          <th>Status</th>
          <th>Edit Book</th>
        </tr>
      </thead>
      <tbody id="booksBody">
        <!-- Rows will be dynamically added here -->
      </tbody>
      <tfoot>
        <tr>
          <td><input type="number" name="number" id="numberInput" required/></td>
          <td><input type="text" name="name" id="nameInput" required/></td>
          <td><input type="text" name="author" id="authorInput" required/></td>
          <td><input type="number" name="pages" id="pagesInput" required /></td>
          <td></td>
          <td><button type="submit" id="add">Add</button></td>
        </tr>
      </tfoot>
    </table>
   </form>`;
}

function getInputsValues() {
  const noInput = $("#numberInput").value;
  const nameInput = $("#nameInput").value;
  const authorInput = $("#authorInput").value;
  const pagesInput = $("#pagesInput").value;

  return {
    noInput,
    nameInput,
    authorInput,
    pagesInput,
  };
}

function addNewBook(event) {
  event.preventDefault();

  const { noInput, nameInput, authorInput, pagesInput } = getInputsValues();

  const newBook = {
    number: noInput,
    name: nameInput,
    author: authorInput,
    pages: pagesInput,
  };

  allBooks.push(newBook);

  updateLocalStorage();

  renderBooks();

  $("#booksForm").reset();
}

function renderBooks() {
  const booksBody = $("#booksBody");
  booksBody.innerHTML = "";

  allBooks.forEach((book, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${book.number}</td>
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td><span class="tick">&#10004;</span></td>
      <td>
        <button type="button" class="editBtn" data-index="${index}">🖌</button>
        <button type="button" class="deleteBtn" data-index="${index}">❌</button>
      </td>
    `;

    booksBody.appendChild(newRow);
  });

  document
    .querySelectorAll(".deleteBtn")
    .forEach((button) => button.addEventListener("click", deleteBook));
  document
    .querySelectorAll(".editBtn")
    .forEach((button) => button.addEventListener("click", editBook));
}

function deleteBook(event) {
  const index = event.target.dataset.index;
  allBooks.splice(index, 1);
  updateLocalStorage();
  renderBooks();
}

function editBook(event) {
  const index = event.target.dataset.index;
  const book = allBooks[index];

  $("#numberInput").value = book.number;
  $("#nameInput").value = book.name;
  $("#authorInput").value = book.author;
  $("#pagesInput").value = book.pages;
}

function updateLocalStorage() {
  localStorage.setItem("books", JSON.stringify(allBooks));
}

function loadBooksFromLocalStorage() {
  const storedBooks = localStorage.getItem("books");
  if (storedBooks) {
    allBooks = JSON.parse(storedBooks);
    renderBooks();
  }
}

function initEvents() {
  $("body").innerHTML = createStructure() + createTable();

  const form = $("#booksForm");
  form.addEventListener("submit", addNewBook);

  loadBooksFromLocalStorage();
}

initEvents();
