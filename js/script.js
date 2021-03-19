const button = document.querySelector("[data-js='btnAdd']");
const input = document.querySelector("[data-js='inputTodo']");
const tbody = document.querySelector("[data-js='tbody']");
const buttonRemove = document.querySelector("[data-js='btnRemove']");

//array de todos
let todoList = JSON.parse(localStorage.getItem("todos-js")) || [];

button.addEventListener("click", () => getInputTodo(input.value));
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    getInputTodo(input.value);
  }
});

function getInputTodo(value) {
  let todoId = 0;
  const newValue = value.trim();
  if (newValue.length === 0) {
    console.log(typeof value);
    return;
  }

  //cria id
  todoId = todoList.length;

  //cria o todo
  const newTodo = { id: todoId++, description: newValue, done: false };

  //limpa o input
  input.value = "";

  //salvando o todo
  setTodo(newTodo);
  renderTodoList(todoList);
}

function renderTodoList(todos) {
  tbody.innerHTML = "";

  updateClass();
  countTodoConclued(todoList);

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const doneStatus = todo.done ? "checked" : false;

    tbody.innerHTML += `
    <tr class="c-tbody__tr">
    <td class="c-table__td">
      <input
        class="c-checkbox"
        type="checkbox"
        name='${todo.id}'
        id='${todo.id}'
        ${doneStatus}
        onclick='concludeTodo(${todo.id})'
      />
      <label class="c-checkbox__control" for="${todo.id}"></label>
    </td>
    <td>${todo.description}</td>
    <td>
      <button data-js="btnRemove" class="c-button c-button--remove" onclick="removeTodo(${i})">Remover</button>
    </td>
  </tr>
    `;
  }
}

function setTodo(todo) {
  //salva o todo no array
  todoList.push(todo);
  updateLocalStorage(todoList);
  //atualizando o html
  renderTodoList(todoList);
}

function removeTodo(todoId) {
  // remove o do array o todo
  todoList.splice(todoId, 1);
  updateLocalStorage(todoList);
  // atualiza o html
  renderTodoList(todoList);
}

function concludeTodo(todoId) {
  todoList.forEach((todo) => {
    if (todo.id === todoId) {
      todo.done = todo.done ? false : true;
    }
  });

  updateLocalStorage(todoList);
  countTodoConclued(todoList);
}

function updateLocalStorage(todos) {
  localStorage.setItem("todos-js", JSON.stringify(todos));
}

function updateClass() {
  const illustration = document.querySelector(
    "[data-js='c-illustration-notfound']"
  );
  const table = document.querySelector("[data-js='tableTodo']");

  if (todoList.length !== 0) {
    table.classList.remove("--hidden");
    illustration.classList.add("--hidden");
  } else {
    table.classList.add("--hidden");
    illustration.classList.remove("--hidden");
  }
}

function countTodoConclued(todos) {
  const totalTodo = todos.reduce(
    (accumulator, todoDone) => (accumulator += todoDone.done ? 0 : 1),
    0
  );
  console.log(totalTodo);
  renderCountTodo(totalTodo);
}

function renderCountTodo(todoTotal) {
  //verifica se o span já existe
  const existSpan = document.querySelector(".c-main__count");
  if (todoTotal > 0 && existSpan == null) {
    createElementSpan(todoTotal);
  }

  //se não existe adiciona o span no main
  if (existSpan !== null) {
    //atualizao span e exibe
    existSpan.innerHTML = `Total de TODOS pendentes ${todoTotal}`;
    existSpan.classList.remove("--hidden");

    if (todoTotal == 0) {
      //esconde caso o valor seja 0
      existSpan.classList.add("--hidden");
    }
  }
}

function createElementSpan(todoTotal) {
  const main = document.querySelector(".c-main");
  //cria o element span
  const span = document.createElement("span");
  span.classList.add("c-main__count");
  span.innerHTML = `Total de TODOS pendentes ${todoTotal}`;
  main.appendChild(span);
}

function init() {
  renderTodoList(todoList);
}

init();
