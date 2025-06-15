function highlight(table) {
  let rows = table.tBodies[0].rows;

  for (let row of rows) {
    let ageCell = row.cells[1];
    let genderCell = row.cells[2];
    let statusCell = row.cells[3];

    let available = statusCell.getAttribute('data-available');
    if (available === 'true') {
      row.classList.add('available');
    } else if (available === 'false') {
      row.classList.add('unavailable');
    } else {
      row.hidden = true;
    }

    if (genderCell.textContent === 'm') {
      row.classList.add('male');
    } else if (genderCell.textContent === 'f') {
      row.classList.add('female');
    }

    if (parseInt(ageCell.textContent, 10) < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
