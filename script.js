const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTag = document.getElementById("taskTag");
const taskList = document.getElementById("taskList");
const notesArea = document.getElementById("notesArea");
const calendar = document.getElementById("calendar");
const fontSelector = document.getElementById("fontSelector");
const bgColorPicker = document.getElementById("bgColorPicker");

// Load everything on start
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  loadNotes();
  loadSettings();
});

// Add task
function addTask() {
  const text = taskInput.value.trim();
  const date = taskDate.value;
  const tag = taskTag.value;
  if (!text) return;

  const task = { text, date, tag, done: false };
  saveTask(task);
  renderTask(task);
  taskInput.value = "";
  taskDate.value = "";
  taskTag.value = "default";
}

// Render task
function renderTask(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = `${task.text} ${task.date ? "(" + task.date + ")" : ""}`;
  span.style.color = task.tag;

  if (task.done) li.classList.add("done");
  if (task.date && new Date(task.date) < new Date() && !task.done) {
    li.classList.add("overdue");
  }

  const actions = document.createElement("div");
  const doneBtn = document.createElement("button");
  doneBtn.textContent = task.done ? "Undo" : "Done";
  doneBtn.onclick = () => toggleDone(task, li, doneBtn);

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.style.background = "#dc3545";
  delBtn.onclick = () => deleteTask(task, li);

  actions.appendChild(doneBtn);
  actions.appendChild(delBtn);
  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}

// Save task
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(renderTask);
}

// Toggle done
function toggleDone(task, li, btn) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = tasks.findIndex(t => t.text === task.text && t.date === task.date);
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  li.classList.toggle("done");
  btn.textContent = tasks[index].done ? "Undo" : "Done";
}

// Delete task
function deleteTask(task, li) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => !(t.text === task.text && t.date === task.date));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  li.remove();
}

// Notes
function saveNotes() {
  localStorage.setItem("notes", notesArea.value);
}
function loadNotes() {
  notesArea.value = localStorage.getItem("notes") || "";
}

// Settings
fontSelector.onchange = () => {
  document.body.style.fontFamily = fontSelector.value;
  localStorage.setItem("font", fontSelector.value);
};
bgColorPicker.oninput = () => {
  document.body.style.background = bgColorPicker.value;
  localStorage.setItem("bg", bgColorPicker.value);
};
function loadSettings() {
  const font = localStorage.getItem("font");
  const bg = localStorage.getItem("bg");
  if (font) {
    document.body.style.fontFamily = font;
    fontSelector.value = font;
  }
  if (bg) {
    document.body.style.background = bg;
    bgColorPicker.value = bg;
  }
}
