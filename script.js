let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function renderTasks(filteredTasks = tasks) {
    const tbody = document.querySelector('#taskTable tbody');
    tbody.innerHTML = '';
    filteredTasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id.substr(0, 3)}...</td>
            <td class="${task.isCompleted ? 'completed' : ''}">${task.description}</td>
            <td>${task.isCompleted ? 'Yes' : 'No'}</td>
            <td>
                <button onclick="toggleCompletion('${task.id}')" style="background-color: ${task.isCompleted ? '#4CAF50' : '#FF9800'}">
                    ${task.isCompleted ? 'Undo Completion' : 'Mark as Completed'}
                </button>
                <button onclick="openEditPopup('${task.id}')" style="background-color: #2196F3">Edit</button>
                <button onclick="removeTask('${task.id}')" style="background-color: #f44336">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addTask(event) {
    event.preventDefault();
    const input = document.getElementById('taskInput');
    const task = {
        id: generateId(),
        description: input.value,
        isCompleted: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = '';
}

function toggleCompletion(id) {
    const task = tasks.find(t => t.id === id);
    task.isCompleted = !task.isCompleted;
    saveTasks();
    renderTasks();
}

function openEditPopup(id) {
    const task = tasks.find(t => t.id === id);
    const editInput = document.getElementById('editInput');
    editInput.value = task.description;
    document.getElementById('editPopup').style.display = 'block';
    
    document.getElementById('saveEditButton').onclick = function() {
        task.description = editInput.value;
        saveTasks();
        renderTasks();
        document.getElementById('editPopup').style.display = 'none';
    };
    
    document.getElementById('cancelEditButton').onclick = function() {
        document.getElementById('editPopup').style.display = 'none';
    };
}

function removeTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.getElementById('taskForm').addEventListener('submit', addTask);

document.getElementById('filterCompletedButton').addEventListener('click', function() {
    const completedTasks = tasks.filter(task => task.isCompleted);
    renderTasks(completedTasks);
});

// Initial render
renderTasks();
