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
          <span class="edit">🖌</span>
          <span class="delete">❌</span>
        </td>
      </tr>
    </tbody>
  </table>`;
}

function initEvents() {
  document.querySelector("body").innerHTML = createStructure() + createTable();
  console.log("creating structure");
}

initEvents();
