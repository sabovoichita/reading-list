function $(selector) {
  return document.querySelector(selector);
}
function createStructure() {
  return `
  <header>
     <h1>Reading list</h1>
  </header>`;
}
function createTable() {
  return `
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
      <tbody>
        <tr>
          <td>1</td>
          <td>The 5 am club</td>
          <td>Robin Sharma</td>
          <td>252</td>
          <td>
            <span class="tick">&#10004;</span>
          </td>
          <td>
           <button type="submit">🖌</button>
           <button type="reset">❌</button>
          </td>
        </tr>
      </tbody>
      <tr>
        <td><input type="number" name="" id="numberInput" required/></td>
        <td><input type="text" name="" id="nameInput"  required/></td>
        <td><input type="text" name="" id="authorInput"  required/></td>
        <td><input type="number" name="" id="pagesInput"  required /></td>
        <td></td>
        <td><button id="add">Add</button></td>
      </tr>
    </table>`;
}
function getInputsValues() {
  console.log("getting values");
  const noInput = $("#numberInput").value;
  const nameInput = $("#nameInput").value;
  const authorInput = $("#authorInput").value;
  const pagesInput = $("#pagesInput").value;
  console.log("Number value is", noInput);
  console.log("Name value is", nameInput);
  console.log("Author value is", authorInput);
  console.log("Pages value is", pagesInput);
}

function initEvents() {
  $("body").innerHTML = createStructure() + createTable();
  console.log("creating structure");
  const button = $("#add");
  button.addEventListener("click", getInputsValues);
}

initEvents();
