const saveButton = document.querySelector('.save-task');
        const taskInput = document.querySelector('.new-task input');
        const taskGrid = document.querySelector('.task-grid'); // <-- use correct class name

        // Load saved tasks from localStorage and add them without duplicating
        window.addEventListener('DOMContentLoaded', () => {
            enhanceExistingTasks();
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            savedTasks.forEach(text => addTask(text));
        });

        saveButton.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            if (!taskText) return;

            addTask(taskText);
            saveToLocalStorage();
            taskInput.value = '';
        });

        function addTask(taskText) {
            const wrapper = document.createElement('div');
            wrapper.className = 'task-wrapper';

            const taskBtn = document.createElement('button');
            taskBtn.className = 'task';
            taskBtn.textContent = taskText;
            taskBtn.style.backgroundColor = '#ffe599';

            taskBtn.addEventListener('click', () => {
                taskBtn.classList.toggle('done');
            });

            const editBtn = document.createElement('button');
            editBtn.textContent = '✏️';
            editBtn.className = 'edit-btn';
            editBtn.addEventListener('click', () => {
                const newText = prompt('Edit your task:', taskBtn.textContent);
                if (newText) {
                    taskBtn.textContent = newText;
                    saveToLocalStorage();
                }
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                wrapper.remove();
                saveToLocalStorage();
            });

            wrapper.appendChild(taskBtn);
            wrapper.appendChild(editBtn);
            wrapper.appendChild(deleteBtn);
            taskGrid.appendChild(wrapper);
        }

        function saveToLocalStorage() {
            const tasks = [];
            document.querySelectorAll('.task-wrapper .task').forEach(task => {
                tasks.push(task.textContent);
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function enhanceExistingTasks() {
            const taskButtons = document.querySelectorAll('.task-grid > .task');
            taskButtons.forEach(task => {
                if (task.classList.contains('task-disabled') || task.parentElement.classList.contains('task-wrapper')) return;

                const wrapper = document.createElement('div');
                wrapper.className = 'task-wrapper';

                const clone = task.cloneNode(true);
                clone.addEventListener('click', () => {
                    clone.classList.toggle('done');
                });

                const editBtn = document.createElement('button');
                editBtn.textContent = '✏️';
                editBtn.className = 'edit-btn';
                editBtn.addEventListener('click', () => {
                    const newText = prompt('Edit your task:', clone.textContent);
                    if (newText) {
                        clone.textContent = newText;
                        saveToLocalStorage();
                    }
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '🗑️';
                deleteBtn.className = 'delete-btn';
                deleteBtn.addEventListener('click', () => {
                    wrapper.remove();
                    saveToLocalStorage();
                });

                wrapper.appendChild(clone);
                wrapper.appendChild(editBtn);
                wrapper.appendChild(deleteBtn);
                task.replaceWith(wrapper);
            });
        }