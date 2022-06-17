function newTodo({ id, text, checked }) {
  const todoList = document.getElementById("todos");

  const newTodoElement = createTodoElement(id, text, checked);

  addEventListenersToTodoElement(newTodoElement);

  todoList.appendChild(newTodoElement);
}

function addEventListenersToTodoElement(newTodoElement) {
  newTodoElement
    .querySelector('input[type="text"]')
    .addEventListener("input", updateTodoText);

  newTodoElement
    .querySelector('input[type="checkbox"]')
    .addEventListener("input", completeTodo);

  newTodoElement.querySelector("button").addEventListener("click", removeTodo);
}

function createTodoElement(id, text, checked) {
  const todoTemplate = document.getElementById("template-todo").content;
  const newTodoFragment = todoTemplate.cloneNode(true);
  const newTodoElement = newTodoFragment.querySelector(".todo");

  newTodoElement.dataset.id = id;
  newTodoElement.querySelector('input[type="text"]').value = text;
  newTodoElement.querySelector('input[type="checkbox"]').checked = checked;
  return newTodoElement;
}

function updateTodoText(inputUpdatedEvent) {
  const todoElement = inputUpdatedEvent.target.closest(".todo");
  const id = todoElement.dataset.id;
  const text = inputUpdatedEvent.target.value;
  const completed = todoElement.querySelector('input[type="checkbox"]').checked;
  window.localStorage.setItem(id, JSON.stringify({ text, completed }));
}

function removeTodo(removeButtonEvent) {
  const todoElement = removeButtonEvent.target.closest(".todo");
  const id = todoElement.dataset.id;
  window.localStorage.removeItem(id);
  todoElement.remove();
}

function completeTodo(checkboxClickedEvent) {
  const todoElement = checkboxClickedEvent.target.closest(".todo");
  const id = todoElement.dataset.id;
  const text = todoElement.querySelector('input[type="text"]').value;
  const completed = checkboxClickedEvent.target.checked;
  window.localStorage.setItem(id, JSON.stringify({ text, completed }));
}

function loadExistingTodos() {
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);

    if (key.startsWith("todo-")) {
      const todo = JSON.parse(window.localStorage.getItem(key));
      newTodo({ id: key, text: todo.text, checked: todo.completed });
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadExistingTodos();

  document.getElementById("add-todo").addEventListener("click", function () {
    newTodo({ id: `todo-${Date.now()}`, text: "", checked: false });
  });
});
