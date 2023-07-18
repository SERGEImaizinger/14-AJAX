/*Написать код приложения, интерфейс которого состоит из двух input и кнопки. 
В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 
или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 
или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или 
не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по 
URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
Пример. Если пользователь ввёл 5 и 7, то запрос будет вида 
https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из 
последнего успешно выполненного запроса (использовать localStorage).*/

const inputOne = document.querySelector(".inputOne");
const inputTwo = document.querySelector(".inputTwo");
const content = document.querySelector(".content");

document.addEventListener("DOMContentLoaded", () => {
  let one = localStorage.getItem("one");
  let two = localStorage.getItem("two");

  if (1 <= one && one <= 10 && 1 <= two && two <= 10) {
    // if(){
    request(one, two);
    // }
  }
});

document.querySelector(".button").addEventListener("click", displayResult);

function displayResult() {
  const page = inputOne.value;
  const limit = inputTwo.value;
  let validity = [];
  let x;

  valid(page, limit, validity);
  recordLocalStorage(page, limit);
  validity.forEach((el) => (x = el));
  if (x) {
    request(page, limit);
  }
}

async function request(page, limit) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`
  );
  api = await res.json();
  if (res.status == "200") {
    let card = "";
    api.forEach((el) => {
      let cards = `<img
          src="${el.url}"
          class="card-image"
        />`;
      card = card + cards;
    });
    content.innerHTML = card;
  } else {
    card.innerHTML = `Код ошибки ${res.status}`;
  }
}

function valid(page, limit, validity) {
  if ((1 <= page && page <= 10) || (1 <= limit && limit <= 10)) {
    validity.push(true);

    if (1 <= page && page <= 10) {
      validity.push(true);
    } else {
      validity.push(false);
      return (content.innerHTML = "Номер страницы вне диапазона от 1 до 10");
    }
    if (1 <= limit && limit <= 10) {
      validity.push(true);
    } else {
      validity.push(false);
      return (content.innerHTML = "Лимит вне диапазона от 1 до 10");
    }
  } else {
    validity.push(false);
    return (content.innerHTML =
      "Номер страницы и лимит вне диапазона от 1 до 10");
  }
}

function recordLocalStorage(page, limit) {
  localStorage.setItem("one", page);
  localStorage.setItem("two", limit);
}
