document.addEventListener('DOMContentLoaded', () => {
    
    // --- State Management ---
    // Load tasks from LocalStorage, or start with empty array
    let tasks = JSON.parse(localStorage.getItem('dashboardTasks')) || [];

    // DOM Elements
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskTitle');
    const priorityInput = document.getElementById('taskPriority');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');

    const statTotal = document.getElementById('totalTasks');
    const statCompleted = document.getElementById('completedTasks');
    const statPending = document.getElementById('pendingTasks');

    // --- Core CRUD Functions ---

    // CREATE: Add a new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newTask = {
            id: Date.now().toString(), // Unique ID based on timestamp
            title: taskInput.value.trim(),
            priority: priorityInput.value,
            completed: false,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };

        tasks.unshift(newTask); // Add to beginning of array
        saveData();
        renderTasks();
        taskForm.reset();
    });

    // UPDATE: Toggle completed status
    window.toggleTask = (id) => {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveData();
        renderTasks(); // Re-render to show updated UI
    };

    // DELETE: Remove a task
    window.deleteTask = (id) => {
        if(confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id !== id);
            saveData();
            renderTasks();
        }
    };

    // --- Utility Functions ---

    // Save to LocalStorage
    function saveData() {
        localStorage.setItem('dashboardTasks', JSON.stringify(tasks));
        updateStats();
    }

    // Update Dashboard Numbers
    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;

        statTotal.innerText = total;
        statCompleted.innerText = completed;
        statPending.innerText = pending;
    }

    // READ: Render tasks to the screen
    function renderTasks(searchQuery = '') {
        // Clear the current list
        taskList.innerHTML = '';

        // Filter tasks based on search query
        const filteredTasks = tasks.filter(task => 
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <i class="ph ph-clipboard-text" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>No tasks found</h3>
                    <p>Add a new task above to get started.</p>
                </div>
            `;
            return;
        }

        // Generate HTML for each task
        filteredTasks.forEach(task => {
            const card = document.createElement('div');
            card.className = `task-card ${task.completed ? 'completed' : ''}`;
            
            // Priority badge styling class
            const priorityClass = task.priority.toLowerCase();

            card.innerHTML = `
                <div>
                    <div class="task-header">
                        <span class="badge ${priorityClass}">${task.priority}</span>
                    </div>
                    <div class="task-title">${task.title}</div>
                </div>
                <div class="task-footer">
                    <span class="task-date"><i class="ph ph-calendar"></i> ${task.date}</span>
                    <div class="task-actions">
                        <button class="btn-icon complete" onclick="toggleTask('${task.id}')" title="Toggle Status">
                            <i class="${task.completed ? 'ph-fill ph-arrow-u-up-left' : 'ph ph-check'}"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteTask('${task.id}')" title="Delete Task">
                            <i class="ph ph-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            taskList.appendChild(card);
        });
    }

    // --- Event Listeners ---
    
    // Real-time Search Filtering
    searchInput.addEventListener('input', (e) => {
        renderTasks(e.target.value);
    });

    // Initial Render
    updateStats();
    renderTasks();
});