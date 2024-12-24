document.getElementById('addTaskButton').addEventListener('click', function () {
  const taskInput = document.getElementById('newTask');
  const taskText = taskInput.value.trim();

  if (taskText) {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task-item');
    taskElement.innerHTML = `
      <span class="task-text">${taskText}</span>
      <button class="delete-btn">Delete</button>
    `;

    taskElement.querySelector('.task-text').addEventListener('click', function () {
      taskElement.classList.toggle('completed');
    });

    taskElement.querySelector('.delete-btn').addEventListener('click', function () {
      taskElement.remove();
    });

    document.getElementById('taskList').appendChild(taskElement);
    taskInput.value = '';
  }
});

document.getElementById('newTask').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    document.getElementById('addTaskButton').click();
  }
});

function saveTasks() {
  const tasks = [];
  const taskItems = document.querySelectorAll('.task-item');

  taskItems.forEach(item => {
    const taskText = item.querySelector('.task-text').innerText;
    const isCompleted = item.classList.contains('completed');
    tasks.push({ taskText, isCompleted });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task-item');
    taskElement.innerHTML = `
      <span class="task-text">${task.taskText}</span>
      <button class="delete-btn">Delete</button>
    `;
    if (task.isCompleted) {
      taskElement.classList.add('completed');
    }

    taskElement.querySelector('.task-text').addEventListener('click', function () {
      taskElement.classList.toggle('completed');
      saveTasks();
    });

    taskElement.querySelector('.delete-btn').addEventListener('click', function () {
      taskElement.remove();
      saveTasks();
    });

    document.getElementById('taskList').appendChild(taskElement);
  });
}

window.onload = function () {
  loadTasks();
};

window.onbeforeunload = function () {
  saveTasks();
};
