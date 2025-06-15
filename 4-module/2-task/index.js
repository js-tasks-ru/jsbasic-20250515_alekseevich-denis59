function makeDiagonalRed(table) {
    for (let i = 0; i < table.rows.length; i++) {
    let cell = table.rows[i].cells[i];
    if (cell) {
      cell.style.backgroundColor = 'red';
    }
  }
}
