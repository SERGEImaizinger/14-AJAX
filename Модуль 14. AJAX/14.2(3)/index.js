/*Напишите код приложения, интерфейс которого представляет собой input и кнопку. 
В input можно ввести любое число. При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».

Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по 
URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.*/

const input = document.querySelector("input");
const btnNode = document.querySelector("button");

function useRequest(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("get", url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log("Статус ответа: ", xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  xhr.onerror = function () {
    console.log("Ошибка! Статус ответа: ", xhr.status);
  };

  xhr.send();
}
const resultNode = document.querySelector(".result");
function showResult(apiData) {
  let cards = "";
  apiData.forEach((item) => {
    const cardBlock = `
          <div class="card">
              <img class="card-image" src="${item.url}">
              <p>${item.author}</p>
          </div>
      `;
    cards += cardBlock;
  });

  resultNode.innerHTML = cards;
}
btnNode.addEventListener("click", () => {
  const value = document.querySelector("input").value;
  if (value <= 10 && value > 1) {
    useRequest(
      "https://jsonplaceholder.typicode.com/photos?_limit=" + value,
      showResult
    );
  } else {
    alert("число вне диапазона от 1 до 10");
  }
});
