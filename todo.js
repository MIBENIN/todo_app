let task_list = document.querySelector(".task-list");

displaytask();
document.getElementById("taskform").addEventListener("submit", (e) => {
  e.preventDefault();
  const task = document.getElementById("task-input").value;
  const formValid = validateForm(task);
  if (formValid) {
    acceptData(task);
  }
});

let taskData = JSON.parse(localStorage.getItem("tasks")) || [];
function acceptData(t) {
  taskData.push(t);
  localStorage.setItem("tasks", JSON.stringify(taskData));
  createtask();
}

function displaytask() {
  createtask();
}
function createtask() {
  let tasks = localStorage.getItem("tasks");
  let parsedtasks = JSON.parse(tasks);
  task_list.innerHTML = "";

  parsedtasks.forEach((task, index) => {
    return (task_list.innerHTML += `
      <div class="tasks">
        <div class="task-div" id="task_${index}">
            <h2 id="task" class="task">${task}</h2>
        </div>
        <div class="task-button-div">
            <button type="button" id="edit" onclick="editTask(${index})"><img src="./edit.svg" alt="" class="task-button"></button>
            <button type="button" id="delete" onclick="deleteTask(${index})"><img src="./delete.svg" alt="" class="task-button"></button>
        </div>
      </div>`);
  });

  resetvalue();
}

function editTask(index) {
  let tasks = localStorage.getItem("tasks");
  let parsedTasks = JSON.parse(tasks);
  const editInput = document.getElementById("task-input");
  const taskDiv = document.querySelector(`#task_${index}`);
  const taskText = taskDiv.querySelector(".task").textContent;
  editInput.value = taskText;
  parsedTasks[index] = editInput.value;
  localStorage.setItem("tasks", JSON.stringify(parsedTasks));
  taskDiv.querySelector(".task").textContent = editedTaskText;
}

function resetvalue() {
  const taskinput = document.getElementById("task-input");
  taskinput.value = "";
}
function deleteTask(index) {
  console.log("delete btn clicked");
  taskData.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(taskData));
  displaytask();
}
function validateForm(task) {
  if (!task) {
    displayMessage("Task cannot be blank.", "red");
    return false;
  }
  return true;
}
function displayMessage(messageText, color) {
  const message = document.getElementById("message");
  const message_div = document.querySelector(".message-div");
  message_div.style.display = "block";
  message.textContent = messageText;
  message.style.color = color;
}
