const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const taskCounter = document.getElementById("task-counter");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTaskCounter() {
  const taskCount = todos.length;

  if (taskCount === 0) {
    taskCounter.textContent = "No missions yet";
  } else if (taskCount === 1) {
    taskCounter.textContent = "1 mission remaining";
  } else {
    taskCounter.textContent = `${taskCount} missions remaining`;
  }
}

function deleteTodo(todoIndex) {
  todos.splice(todoIndex, 1);

  saveTodos();
  renderTodos();
}

function createTodoElement(todo, todoIndex) {
  const listItem = document.createElement("li");
  listItem.classList.add("todo-item");

  const missionNumber = document.createElement("span");
  missionNumber.classList.add("mission-number");
  missionNumber.textContent = String(todoIndex + 1).padStart(2, "0");

  const todoContent = document.createElement("div");
  todoContent.classList.add("todo-content");

  const missionLabel = document.createElement("span");
  missionLabel.classList.add("mission-label");
  missionLabel.textContent = "MISSION";

  const todoText = document.createElement("span");
  todoText.classList.add("todo-text");
  todoText.textContent = todo;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.type = "button";
  deleteButton.textContent = "×";
  deleteButton.setAttribute("aria-label", `Delete ${todo}`);

  deleteButton.addEventListener("click", () => {
    deleteTodo(todoIndex);
  });

  todoContent.append(missionLabel, todoText);

  listItem.append(
    missionNumber,
    todoContent,
    deleteButton
  );

  return listItem;
}

function renderTodos() {
  todoList.innerHTML = "";

  updateTaskCounter();

  if (todos.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.classList.add("empty-state");

    const emptyFace = document.createElement("div");
    emptyFace.classList.add("empty-face");
    emptyFace.textContent = "☆";

    const emptyTitle = document.createElement("p");
    emptyTitle.classList.add("empty-title");
    emptyTitle.textContent = "Quest board cleared!";

    const emptyText = document.createElement("p");
    emptyText.classList.add("empty-text");
    emptyText.textContent =
      "Add a new mission and begin your adventure.";

    emptyState.append(
      emptyFace,
      emptyTitle,
      emptyText
    );

    todoList.appendChild(emptyState);

    return;
  }

  todos.forEach((todo, index) => {
    const todoElement = createTodoElement(todo, index);

    todoList.appendChild(todoElement);
  });
}

function addTodo() {
  const todoText = input.value.trim();

  if (todoText === "") {
    input.classList.add("input-error");
    input.focus();

    setTimeout(() => {
      input.classList.remove("input-error");
    }, 500);

    return;
  }

  todos.push(todoText);

  saveTodos();
  renderTodos();

  input.value = "";
  input.focus();
}

addButton.addEventListener("click", addTodo);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

renderTodos();