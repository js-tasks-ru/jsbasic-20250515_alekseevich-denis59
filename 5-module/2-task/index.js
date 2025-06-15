function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let text = document.getElementById('text');

  button.addEventListener('click', () => {
    if (text.hidden) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  });
}
