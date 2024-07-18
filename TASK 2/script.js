document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".todo-input");
  const addButton = document.querySelector(".add-button");
  const todosHtml = document.querySelector(".todos");
  const emptyImage = document.querySelector(".empty-image");
  const completedCount = document.getElementById("completed-count");
  const pendingCount = document.getElementById("pending-count");
  const completedCountOverview = document.getElementById("completed-count-overview");
  const totalCount = document.getElementById("total-count");
  const currentDateElement = document.getElementById("current-date");
  const progressBar = document.getElementById("progress-bar");

  let todosJson = JSON.parse(localStorage.getItem("todos")) || [];

  // Update date
  function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString(undefined, options);
  }

  updateDate();
  showTodos();
  updateOverview();

  // Get HTML for a single todo item
  function getTodoHtml(todo, index) {
    let checked = todo.status === "completed" ? "checked" : "";
    return `
      <li class="todo">
        <label for="${index}">
          <input id="${index}" type="checkbox" ${checked} onclick="updateStatus(${index})">
          <span class="${checked}">${todo.name}</span>
        </label>
        <div class="actions">
          <button class="edit-btn" onclick="edit(${index})"><i class="fas fa-edit"></i></button>
          <button class="delete-btn" onclick="remove(${index})"><i class="fas fa-trash"></i></button>
        </div>
      </li>
    `;
  }

  // Display todos
  function showTodos() {
    if (todosJson.length === 0) {
      todosHtml.innerHTML = '';
      emptyImage.style.display = 'block';
    } else {
      todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
      emptyImage.style.display = 'none';
    }
  }

  // Add a new todo
  function addTodo() {
    let todo = input.value.trim();
    if (!todo) return;
    input.value = "";
    todosJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
    updateOverview();
  }

  // Event listeners
  input.addEventListener("keyup", e => {
    if (e.key === "Enter") addTodo();
  });

  addButton.addEventListener("click", addTodo);

  // Update status
  window.updateStatus = function(index) {
    let todo = todosJson[index];
    todo.status = todo.status === "completed" ? "pending" : "completed";
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
    updateOverview();
  }

  // Remove todo
  window.remove = function(index) {
    todosJson.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
    updateOverview();
  }

  // Edit todo
  window.edit = function(index) {
    const newTask = prompt("Edit your task:", todosJson[index].name);
    if (newTask !== null && newTask.trim() !== "") {
      todosJson[index].name = newTask.trim();
      localStorage.setItem("todos", JSON.stringify(todosJson));
      showTodos();
      updateOverview();
    }
  }

  // Update overview
  function updateOverview() {
    const completedTasks = todosJson.filter(todo => todo.status === "completed").length;
    const pendingTasks = todosJson.length - completedTasks;
    completedCount.textContent = completedTasks;
    pendingCount.textContent = pendingTasks;
    completedCountOverview.textContent = completedTasks;
    totalCount.textContent = todosJson.length;
    updateProgressBar(completedTasks, todosJson.length);
  }

  // Update progress bar
  function updateProgressBar(completed, total) {
    const percentage = total === 0 ? 0 : (completed / total) * 100;
    progressBar.style.width = percentage + "%";
  }
});
