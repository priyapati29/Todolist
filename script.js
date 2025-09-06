let tasks = [];
let filter = "All";

function addTask() {
  const taskInput = document.getElementById("taskInput").value.trim();
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;
  const category = document.getElementById("category").value;

  if (taskInput === "") return alert("Enter a task!");

  const task = {
    id: Date.now(),
    text: taskInput,
    priority: priority,
    dueDate: dueDate,
    category: category,
    status: "Pending",
  };

  tasks.push(task);
  document.getElementById("taskInput").value = "";
  renderTasks();
  updateProgress();
}

function setFilter(f) {
  filter = f;
  renderTasks();
}

function toggleStatus(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, status: t.status === "Pending" ? "Completed" : "Pending" } : t
  );
  renderTasks();
  updateProgress();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
  updateProgress();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks
    .filter(t => filter === "All" || t.status === filter)
    .forEach(task => {
      const li = document.createElement("li");
      li.className = "task";

      li.innerHTML = `
        <span><b>${task.text}</b> | ${task.category} | ${task.priority} | ${task.dueDate || "No date"}</span>
        <div>
          <button class="complete" onclick="toggleStatus(${task.id})">✔</button>
          <button class="delete" onclick="deleteTask(${task.id})">🗑</button>
        </div>
      `;

      taskList.appendChild(li);
    });
}

function updateProgress() {
  const completed = tasks.filter(t => t.status === "Completed").length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("progressText").innerText = `Progress: ${percent}%`;
  document.getElementById("progressBar").style.width = percent + "%";
}
