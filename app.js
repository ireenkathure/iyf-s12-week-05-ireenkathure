// Lesson 10 - To-Do List - Ireen Kathure
// RULE: the array is the truth, the page is a picture of it.
// Every action = (1) change todos (2) call render()
// textContent for task text - ONE click listener on the list - const/let only

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const formError = document.getElementById("form-error");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

let todos = [];
let currentFilter = "all";
let nextId = 1;
let editingId = null;

// STEP 1 - render
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  if (todo.completed) li.classList.add("completed");
  li.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "toggle";
  checkbox.checked = todo.completed;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete";
  deleteBtn.setAttribute("aria-label", `Delete "${todo.text}"`);
  deleteBtn.textContent = "✕";

  if (editingId === todo.id) {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit";
    editInput.value = todo.text;
    li.append(checkbox, editInput, deleteBtn);
    setTimeout(() => {
      editInput.focus();
      editInput.select();
    }, 0);
  } else {
    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;
    li.append(checkbox, span, deleteBtn);
  }
  return li;
}

function visibleTodos() {
  if (currentFilter === "active") return todos.filter((t) => !t.completed);
  if (currentFilter === "completed") return todos.filter((t) => t.completed);
  return todos;
}

function updateStats() {
  const left = todos.filter((t) => !t.completed).length;
  itemsLeft.textContent = `${left} item${left === 1 ? "" : "s"} left`;
}

function render() {
  todoList.replaceChildren(...visibleTodos().map(createTodoElement));
  updateStats();
}

// STEP 2 - add
function addTodo(text) {
  todos.push({ id: nextId++, text, completed: false });
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) {
    formError.textContent = "Type a task first.";
    return;
  }
  formError.textContent = "";
  addTodo(value);
  input.value = "";
  input.focus();
});

// STEP 3 - toggle and delete with ONE delegated listener
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
  render();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  render();
}

todoList.addEventListener("click", (event) => {
  const item = event.target.closest(".todo-item");
  if (!item) return;
  const id = Number(item.dataset.id);
  if (event.target.closest(".delete")) {
    deleteTodo(id);
    return;
  }
  toggleTodo(id);
});

// STEP 4 - filters, stats, clear completed
function filterTodos(filter) {
  currentFilter = filter;
  filters.forEach((btn) => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
  render();
}

filters.forEach((btn) => {
  btn.addEventListener("click", () => filterTodos(btn.dataset.filter));
});

function clearCompleted() {
  todos = todos.filter((t) => !t.completed);
  render();
}
clearCompletedBtn.addEventListener("click", clearCompleted);

// STEP 5 - BONUS: double-click to edit
todoList.addEventListener("dblclick", (event) => {
  const textEl = event.target.closest(".todo-text");
  if (!textEl) return;
  const item = event.target.closest(".todo-item");
  editingId = Number(item.dataset.id);
  render();
});

todoList.addEventListener("keydown", (event) => {
  if (!event.target.classList.contains("edit")) return;
  const item = event.target.closest(".todo-item");
  const id = Number(item.dataset.id);
  const todo = todos.find((t) => t.id === id);
  if (event.key === "Enter") {
    const newText = event.target.value.trim();
    if (newText) todo.text = newText;
    editingId = null;
    render();
  }
  if (event.key === "Escape") {
    editingId = null;
    render();
  }
});

todoList.addEventListener("focusout", (event) => {
  if (!event.target.classList.contains("edit")) return;
  const item = event.target.closest(".todo-item");
  const id = Number(item.dataset.id);
  const todo = todos.find((t) => t.id === id);
  const newText = event.target.value.trim();
  if (newText) todo.text = newText;
  editingId = null;
  render();
});

render();
