const button = document.querySelector("[data-js='btnAdd']");
const input = document.querySelector("[data-js='inputTodo']");
const tbody = document.querySelector("[data-js='tbody']");
const buttonRemove = document.querySelector("[data-js='btnRemove']");

//array de todos
let todoList = [];

button.addEventListener("click", () => getInputTodo(input.value));

function getInputTodo(value) {
  let todoId = 0;
  const newValue = value.trim();
  if (newValue.length === 0) {
    console.log(typeof value);
    return;
  }

  //cria id
  todoId = todoList.length;
  //salvando o todo
  const newTodo = { id: todoId++, description: newValue, done: false };
  setTodo(newTodo);
  input.value = "";
  renderTodoList(todoList);
}

function renderTodoList(todos) {
  tbody.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const doneStatus = todo.done ? "checked" : false;

    tbody.innerHTML += `
    <tr>
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
  //atualizando o html
  renderTodoList(todoList);
}

function removeTodo(todoId) {
  // remove o do array o todo
  todoList.splice(todoId, 1);

  // atualiza o html
  renderTodoList(todoList);
}

function concludeTodo(todoId) {
  todoList.forEach((todo) => {
    if (todo.id === todoId) {
      todo.done = todo.done ? false : true;
    }
  });
}
