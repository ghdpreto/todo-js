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

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const doneStatus = todo.done ? "checked" : false;

    tbody.innerHTML += `
    <tr class="c-tbody__tr">
    <td class="c-table__td">
      <input
        class="c-table__checkbox"
        type="checkbox"
        name='${todo.id}'
        id='${todo.id}'
        data-key='${todo.id}'
        ${doneStatus}
        onclick='concludeTodo(${todo.id})'
      />
    </td>
    <td>${todo.description}</td>
    <td>
      <button data-key='${i}' data-js="btnRemove" class="c-button c-button--remove" onclick="removeTodo(${i})">Remover</button>
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
}

function updateLocalStorage(todos) {
  localStorage.setItem("todos-js", JSON.stringify(todos));
}

function init() {
  renderTodoList(todoList);
}
init();
