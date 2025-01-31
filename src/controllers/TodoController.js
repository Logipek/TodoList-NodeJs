// src/controllers/TodoController.js
export default class TodoController {
  constructor(model, views) {
      this.model = model;
      this.views = views;
      this.currentView = localStorage.getItem('currentView') || 'list';
      this.filters = {};
      
      this.initializeEventListeners();
      this.initializeViews();
      this.initializeNotifications();
      this.model.subscribe(this.updateView.bind(this));
      
      // Initial render
      this.updateView(this.model.todos);
  }

  initializeViews = () => {
      // Configuration de la vue liste
      if (this.views.list) {
          this.views.list.setOnEdit((id, updates) => {
              this.model.updateTodo(id, updates);
          });
          this.views.list.setOnDelete((id) => {
              this.model.removeTodo(id);
          });
          this.views.list.setOnToggle((id) => {
              this.model.toggleTodo(id);
          });
      }

      // Configuration de la vue Kanban
      if (this.views.kanban) {
          this.views.kanban.setOnEdit((id, updates) => {
              this.model.updateTodo(id, updates);
          });
          this.views.kanban.setOnDelete((id) => {
              this.model.removeTodo(id);
          });
          this.views.kanban.setOnMove((id, status) => {
              this.model.moveTodoToStatus(id, status);
          });
      }

      // Configuration de la vue Calendrier
      if (this.views.calendar) {
          this.views.calendar.setOnEventClick((id) => {
              const todo = this.model.todos.find(t => t.id === parseInt(id, 10));
              if (todo) {
                  this.showEditDialog(todo);
              }
          });
      }

      // Initialiser la vue active
      const activeViewButton = document.querySelector(`[data-view="${this.currentView}"]`);
      if (activeViewButton) {
          activeViewButton.classList.add('active');
      }
  };

  initializeEventListeners = () => {
      // Ajout de tâches
      const addTaskButton = document.getElementById('addTask');
      addTaskButton?.addEventListener('click', () => {
          const taskInput = document.getElementById('taskInput');
          const dueDateInput = document.getElementById('dueDate');
          const prioritySelect = document.getElementById('priority');
          const categorySelect = document.getElementById('category');

          const text = taskInput?.value.trim();
          const dueDate = dueDateInput?.value;
          const priority = prioritySelect?.value;
          const category = categorySelect?.value;

          if (!text || !dueDate || !priority || !category) {
              this.showNotification('Veuillez remplir tous les champs', 'error');
              return;
          }

          this.model.addTodo({ text, dueDate, priority, category });
          this.resetForm();
          this.showNotification('Tâche ajoutée avec succès', 'success');
      });

      // Changement de vue
      document.querySelectorAll('.views-switch button').forEach(button => {
          button.addEventListener('click', (e) => {
              document.querySelectorAll('.views-switch button')
                  .forEach(btn => btn.classList.remove('active'));
              e.target.classList.add('active');
              this.currentView = e.target.dataset.view;
              localStorage.setItem('currentView', this.currentView);
              this.updateView(this.model.todos);
          });
      });

      // Thème
      const themeToggle = document.getElementById('themeToggle');
      themeToggle?.addEventListener('click', () => {
          document.body.classList.toggle('dark-theme');
          localStorage.setItem('theme', 
              document.body.classList.contains('dark-theme') ? 'dark' : 'light');
      });

      // Gestion des catégories
      const addCategoryButton = document.getElementById('addCategory');
      const newCategoryInput = document.getElementById('newCategoryInput');

      addCategoryButton?.addEventListener('click', () => {
          const category = newCategoryInput?.value.trim();
          if (!category) {
              this.showNotification('Veuillez entrer un nom de catégorie', 'error');
              return;
          }

          if (this.model.addCategory(category)) {
              this.updateCategorySelects();
              if (newCategoryInput) {
                  newCategoryInput.value = '';
              }
              this.showNotification('Catégorie ajoutée avec succès', 'success');
          } else {
              this.showNotification('Cette catégorie existe déjà', 'error');
          }
      });

      // Filtres
      const categoryFilter = document.getElementById('categoryFilter');
      categoryFilter?.addEventListener('change', (e) => {
          this.filters.category = e.target.value;
          this.applyFilters();
      });

      const priorityFilter = document.getElementById('priorityFilter');
      priorityFilter?.addEventListener('change', (e) => {
          this.filters.priority = e.target.value;
          this.applyFilters();
      });

      const sortBySelect = document.getElementById('sortBy');
      sortBySelect?.addEventListener('change', (e) => {
          this.filters.sort = e.target.value;
          this.applyFilters();
      });

      // Recherche avec debounce
      const searchInput = document.getElementById('searchTodos');
      let searchTimeout;
      searchInput?.addEventListener('input', (e) => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => {
              this.filters.search = e.target.value;
              this.applyFilters();
          }, 300);
      });
  };

  resetForm = () => {
      const taskInput = document.getElementById('taskInput');
      const dueDateInput = document.getElementById('dueDate');
      const prioritySelect = document.getElementById('priority');
      const categorySelect = document.getElementById('category');

      if (taskInput) taskInput.value = '';
      if (dueDateInput) dueDateInput.value = '';
      if (prioritySelect) prioritySelect.value = 'low';
      if (categorySelect) categorySelect.value = this.model.getCategories()[0];
  };

  updateCategorySelects = () => {
      const categories = this.model.getCategories();
      const selects = ['category', 'categoryFilter'];
      
      selects.forEach(selectId => {
          const select = document.getElementById(selectId);
          if (!select) return;

          const currentValue = select.value;
          select.innerHTML = selectId === 'categoryFilter' 
              ? '<option value="">Toutes les catégories</option>' 
              : '';
              
          categories.forEach(category => {
              const option = document.createElement('option');
              option.value = category;
              option.textContent = category;
              option.selected = currentValue === category;
              select.appendChild(option);
          });
      });
  };

  applyFilters = () => {
      let filteredTodos = [...this.model.todos];

      if (this.filters.category) {
          filteredTodos = filteredTodos.filter(todo => 
              todo.category === this.filters.category);
      }

      if (this.filters.priority) {
          filteredTodos = filteredTodos.filter(todo => 
              todo.priority === this.filters.priority);
      }

      if (this.filters.search) {
          const searchTerm = this.filters.search.toLowerCase();
          filteredTodos = filteredTodos.filter(todo =>
              todo.text.toLowerCase().includes(searchTerm));
      }

      if (this.filters.sort) {
          filteredTodos = this.model.sortTodos(this.filters.sort);
      }

      this.updateView(filteredTodos);
  };

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

  createNotificationContainer = () => {
      const container = document.createElement('div');
      container.id = 'notificationContainer';
      container.className = 'notification-container';
      document.body.appendChild(container);
      return container;
  };

  initializeNotifications = () => {
      if ('Notification' in window) {
          Notification.requestPermission();
          
          // Vérifier les tâches toutes les minutes
          setInterval(() => this.checkDueDates(), 60000);
      }
  };

  checkDueDates = () => {
      const now = new Date();
      this.model.todos.forEach(todo => {
          if (!todo.completed) {
              const dueDate = new Date(todo.dueDate);
              if (dueDate.toDateString() === now.toDateString()) {
                  this.sendBrowserNotification(todo);
              }
          }
      });
  };

  sendBrowserNotification = (todo) => {
      if (Notification.permission === 'granted') {
          new Notification('Rappel de tâche', {
              body: `La tâche "${todo.text}" est à faire aujourd'hui !`,
              icon: '/favicon.ico'
          });
      }
  };

  showEditDialog = (todo) => {
      const dialog = document.createElement('dialog');
      dialog.className = 'edit-dialog';
      
      dialog.innerHTML = `
          <form method="dialog">
              <h2>Modifier la tâche</h2>
              <input type="text" id="editText" value="${todo.text}" required>
              <input type="date" id="editDueDate" value="${todo.dueDate}" required>
              <select id="editPriority">
                  <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Basse</option>
                  <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Moyenne</option>
                  <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>Haute</option>
              </select>
              <select id="editCategory">
                  ${this.model.getCategories().map(category => `
                      <option value="${category}" ${todo.category === category ? 'selected' : ''}>
                          ${category}
                      </option>
                  `).join('')}
              </select>
              <div class="dialog-buttons">
                  <button type="submit">Sauvegarder</button>
                  <button type="button" id="cancelEdit">Annuler</button>
              </div>
          </form>
      `;

      document.body.appendChild(dialog);

      const cancelButton = dialog.querySelector('#cancelEdit');
      cancelButton?.addEventListener('click', () => {
          dialog.close();
          dialog.remove();
      });

      dialog.querySelector('form')?.addEventListener('submit', (e) => {
          e.preventDefault();
          const updates = {
              text: dialog.querySelector('#editText')?.value,
              dueDate: dialog.querySelector('#editDueDate')?.value,
              priority: dialog.querySelector('#editPriority')?.value,
              category: dialog.querySelector('#editCategory')?.value
          };

          this.model.updateTodo(todo.id, updates);
          dialog.close();
          dialog.remove();
      });

      dialog.showModal();
  };

  updateView = (todos) => {
      if (this.views[this.currentView]) {
          this.views[this.currentView].render(todos);
      }
  };
}
