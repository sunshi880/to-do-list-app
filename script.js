// Task Management
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Modal Controls
        document.getElementById('addTaskBtn').addEventListener('click', () => this.openModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('taskForm').addEventListener('submit', (e) => this.handleSubmit(e));

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.className === 'modal') {
                this.closeModal();
            }
        });

        // Set default due date to current time
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        document.getElementById('taskDueDate').value = now.toISOString().slice(0, 16);
    }

    openModal() {
        document.getElementById('taskModal').style.display = 'block';
    }

    closeModal() {
        document.getElementById('taskModal').style.display = 'none';
        document.getElementById('taskForm').reset();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('taskTitle').value;
        const priority = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;

        const task = {
            id: Date.now(),
            title,
            priority,
            dueDate: new Date(dueDate).toISOString(),
            completed: false
        };

        this.tasks.push(task);
        this.saveTasks();
        this.closeModal();
        this.showToast('✨ Task Added');
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.showToast('Task deleted');
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.render();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const isToday = date.toDateString() === today.toDateString();
        const isTomorrow = date.toDateString() === tomorrow.toDateString();

        const timeStr = date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });

        if (isToday) {
            return `Due today at ${timeStr}`;
        } else if (isTomorrow) {
            return `Due tomorrow at ${timeStr}`;
        }

        return `Due on ${date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        })} at ${timeStr}`;
    }

    getUpcomingTasks() {
        const now = new Date();
        return this.tasks
            .filter(task => !task.completed && new Date(task.dueDate) > now)
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 3);
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    render() {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const upcomingTasks = document.getElementById('upcomingTasks');
        const upcomingTasksList = document.getElementById('upcomingTasksList');

        // Handle empty state
        if (this.tasks.length === 0) {
            taskList.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            taskList.style.display = 'block';
            emptyState.style.display = 'none';
        }

        // Render upcoming tasks
        const upcoming = this.getUpcomingTasks();
        if (upcoming.length > 0) {
            upcomingTasks.classList.remove('hidden');
            upcomingTasksList.innerHTML = upcoming
                .map(task => `
                    <li class="flex justify-between">
                        <span>${task.title}</span>
                        <span class="text-sm">${this.formatDate(task.dueDate)}</span>
                    </li>
                `).join('');
        } else {
            upcomingTasks.classList.add('hidden');
        }

        // Render task list
        taskList.innerHTML = this.tasks
            .map(task => `
                <div class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                    <div class="checkbox ${task.completed ? 'checked' : ''}"
                         onclick="taskManager.toggleTask(${task.id})">
                    </div>
                    <div class="task-content">
                        <div class="task-header">
                            <div>
                                <div class="task-title">
                                    <span class="priority-dot ${task.priority}"></span>
                                    <span style="${task.completed ? 'text-decoration: line-through; color: var(--muted)' : ''}">
                                        ${task.title}
                                    </span>
                                </div>
                                <div class="task-priority">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</div>
                            </div>
                            <button class="delete-btn" onclick="taskManager.deleteTask(${task.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="task-due-date">
                            <i class="fas fa-clock"></i>
                            <span>${this.formatDate(task.dueDate)}</span>
                        </div>
                    </div>
                </div>
            `).join('');
    }
}

// Initialize the task manager
const taskManager = new TaskManager();// Task Management
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Modal Controls
        document.getElementById('addTaskBtn').addEventListener('click', () => this.openModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('taskForm').addEventListener('submit', (e) => this.handleSubmit(e));

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.className === 'modal') {
                this.closeModal();
            }
        });

        // Set default due date to current time
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        document.getElementById('taskDueDate').value = now.toISOString().slice(0, 16);
    }

    openModal() {
        document.getElementById('taskModal').style.display = 'block';
    }

    closeModal() {
        document.getElementById('taskModal').style.display = 'none';
        document.getElementById('taskForm').reset();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('taskTitle').value;
        const priority = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;

        const task = {
            id: Date.now(),
            title,
            priority,
            dueDate: new Date(dueDate).toISOString(),
            completed: false
        };

        this.tasks.push(task);
        this.saveTasks();
        this.closeModal();
        this.showToast('✨ Task Added');
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.showToast('Task deleted');
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.render();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const isToday = date.toDateString() === today.toDateString();
        const isTomorrow = date.toDateString() === tomorrow.toDateString();

        const timeStr = date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });

        if (isToday) {
            return `Due today at ${timeStr}`;
        } else if (isTomorrow) {
            return `Due tomorrow at ${timeStr}`;
        }

        return `Due on ${date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        })} at ${timeStr}`;
    }

    getUpcomingTasks() {
        const now = new Date();
        return this.tasks
            .filter(task => !task.completed && new Date(task.dueDate) > now)
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 3);
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    render() {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const upcomingTasks = document.getElementById('upcomingTasks');
        const upcomingTasksList = document.getElementById('upcomingTasksList');

        // Handle empty state
        if (this.tasks.length === 0) {
            taskList.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            taskList.style.display = 'block';
            emptyState.style.display = 'none';
        }

        // Render upcoming tasks
        const upcoming = this.getUpcomingTasks();
        if (upcoming.length > 0) {
            upcomingTasks.classList.remove('hidden');
            upcomingTasksList.innerHTML = upcoming
                .map(task => `
                    <li class="flex justify-between">
                        <span>${task.title}</span>
                        <span class="text-sm">${this.formatDate(task.dueDate)}</span>
                    </li>
                `).join('');
        } else {
            upcomingTasks.classList.add('hidden');
        }

        // Render task list
        taskList.innerHTML = this.tasks
            .map(task => `
                <div class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                    <div class="checkbox ${task.completed ? 'checked' : ''}"
                         onclick="taskManager.toggleTask(${task.id})">
                    </div>
                    <div class="task-content">
                        <div class="task-header">
                            <div>
                                <div class="task-title">
                                    <span class="priority-dot ${task.priority}"></span>
                                    <span style="${task.completed ? 'text-decoration: line-through; color: var(--muted)' : ''}">
                                        ${task.title}
                                    </span>
                                </div>
                                <div class="task-priority">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</div>
                            </div>
                            <button class="delete-btn" onclick="taskManager.deleteTask(${task.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <div class="task-due-date">
                            <i class="fas fa-clock"></i>
                            <span>${this.formatDate(task.dueDate)}</span>
                        </div>
                    </div>
                </div>
            `).join('');
    }
}

// Initialize the task manager
const taskManager = new TaskManager();
