const formSelector = "#booksForm";

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

  const newBook = document.createElement("tr");
  newBook.innerHTML = `
    <td>${noInput}</td>
    <td>${nameInput}</td>
    <td>${authorInput}</td>
    <td>${pagesInput}</td>
    <td><span class="tick">&#10004;</span></td>
    <td>
      <button type="button" class="editBtn">🖌</button>
      <button type="button" class="deleteBtn">❌</button>
    </td>
  `;

  $("#booksBody").appendChild(newBook);

  $(`${formSelector}`).reset();

  newBook.querySelector(".deleteBtn").addEventListener("click", deleteBook);
  newBook.querySelector(".editBtn").addEventListener("click", editBook);
}

function deleteBook(event) {
  const row = event.target.closest("tr");
  row.remove();
}

function editBook(event) {
  const row = event.target.closest("tr");
  const cells = row.querySelectorAll("td");

  $("#numberInput").value = cells[0].textContent;
  $("#nameInput").value = cells[1].textContent;
  $("#authorInput").value = cells[2].textContent;
  $("#pagesInput").value = cells[3].textContent;
}

function initEvents() {
  $("body").innerHTML = createStructure() + createTable();

  const form = $(formSelector);
  form.addEventListener("submit", addNewBook);
}

initEvents();
