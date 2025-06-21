function promiseClick(button) {
  return new Promise((resolve) => {
    button.addEventListener('click', (event) => {
      resolve(event); // резолвим промис с объектом события
    }, { once: true }); // слушатель сработает только один раз и автоматически удалится
  });
}