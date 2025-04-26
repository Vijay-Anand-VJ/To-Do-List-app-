const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const API_URL = 'http://localhost:3000/tasks';

async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span onclick="toggleComplete('${task._id}', ${task.completed})">${task.text}</span>
            <button onclick="deleteTask('${task._id}')">X</button>
        `;
        taskList.appendChild(li);
    });
}

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = taskInput.value;
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    taskInput.value = '';
    fetchTasks();
});

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

async function toggleComplete(id, currentStatus) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus })
    });
    fetchTasks();
}

fetchTasks();
