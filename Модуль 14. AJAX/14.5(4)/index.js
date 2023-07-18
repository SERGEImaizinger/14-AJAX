/*Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit.
 В input можно ввести любое число.

При клике на кнопку происходит следующее:

Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст 
«одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL  */

let inputOne = document.querySelector(".inputOne");
let inputTwo = document.querySelector(".inputTwo");
let content = document.querySelector(".content");

document.querySelector(".button").addEventListener("click", displayResult);

function displayResult() {
  let numberOne = inputOne.value;
  let numberTwo = inputTwo.value;
  100 <= numberOne && numberOne <= 300 && 100 <= numberTwo && numberTwo <= 300
    ? resultImg(numberOne, numberTwo)
    : (content.innerHTML = `Одно из чисел вне диапазона от 100 до 300`);
}

function resultImg(width, height) {
  fetch(`https://dummyimage.com/${width}x${height}`).then(
    (el) =>
      (content.innerHTML = `<img src="${el.url}" alt="image${width}x${height}">`)
  );
}
