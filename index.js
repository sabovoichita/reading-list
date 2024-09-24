let allBooks = [];
let editIndex = null;

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
        <!-- Books will be dynamically added here -->
      </tbody>
      <tfoot>
        <tr>
          <td><input type="text" name="number" "id="autoNumber" disabled value="" /></td>
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
  const nameInput = $("#nameInput").value;
  const authorInput = $("#authorInput").value;
  const pagesInput = $("#pagesInput").value;

  return {
    nameInput,
    authorInput,
    pagesInput,
  };
}

function getNextAvailableNumber() {
  if (allBooks.length === 0) {
    return 1;
  }

  const existingNumbers = allBooks.map((book) => Number(book.number));

  let nextNumber = 1;
  while (existingNumbers.includes(nextNumber)) {
    nextNumber++;
  }

  return nextNumber;
}

function addOrUpdateBook(event) {
  event.preventDefault();

  const { nameInput, authorInput, pagesInput } = getInputsValues();

  const bookNumber =
    editIndex !== null ? allBooks[editIndex].number : getNextAvailableNumber();

  const newBook = {
    number: bookNumber,
    name: nameInput,
    author: authorInput,
    pages: pagesInput,
  };

  if (editIndex !== null) {
    allBooks[editIndex] = newBook;
    editIndex = null;
  } else {
    allBooks.push(newBook);
  }

  updateLocalStorage();
  renderBooks();
  $("#booksForm").reset();
  $("#autoNumber").value = "Auto";
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

  $("#nameInput").value = book.name;
  $("#authorInput").value = book.author;
  $("#pagesInput").value = book.pages;
  $("#autoNumber").value = book.number;

  editIndex = index;
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
  form.addEventListener("submit", addOrUpdateBook);

  loadBooksFromLocalStorage();
}
initEvents();
