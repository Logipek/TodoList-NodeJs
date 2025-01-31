// src/views/ListView.js
export default class ListView {
  constructor(container, categories) {
      this.container = container;
      this.categories = categories;
      this.onEdit = null;
      this.onDelete = null;
      this.onToggle = null;
  }

  render(todos) {
      this.container.innerHTML = `
          <div class="todo-list">
              ${todos.map(todo => this.createTodoItem(todo)).join('')}
          </div>
      `;
      this.attachEventListeners();
  }

  createTodoItem(todo) {
      return `
          <div class="todo-item ${todo.completed ? 'completed' : ''}" 
               data-id="${todo.id}">
              <input type="checkbox" class="todo-checkbox" 
                     ${todo.completed ? 'checked' : ''}>
              <input type="text" class="edit-todo" value="${todo.text}" readonly>
              <input type="date" class="edit-date" value="${todo.dueDate}" readonly>
              <select class="edit-priority" disabled>
                  <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Basse</option>
                  <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Moyenne</option>
                  <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>Haute</option>
              </select>
              <select class="edit-category" disabled>
                  ${this.categories.map(category => `
                      <option value="${category}" ${todo.category === category ? 'selected' : ''}>
                          ${category}
                      </option>
                  `).join('')}
              </select>
              <button class="edit-btn">✏️</button>
              <button class="save-btn" style="display: none">💾</button>
              <button class="delete-btn">🗑️</button>
          </div>
      `;
  }

  attachEventListeners() {
      this.container.querySelectorAll('.todo-item').forEach(item => {
          const id = item.dataset.id;

          // Gestionnaire de la case à cocher
          item.querySelector('.todo-checkbox').addEventListener('change', () => {
              if (this.onToggle) {
                  this.onToggle(id);
              }
          });

          // Gestionnaire du bouton d'édition
          item.querySelector('.edit-btn').addEventListener('click', () => {
              this.enableEditing(item);
          });

          // Gestionnaire du bouton de sauvegarde
          item.querySelector('.save-btn').addEventListener('click', () => {
              this.saveEdits(item);
          });

          // Gestionnaire du bouton de suppression
          item.querySelector('.delete-btn').addEventListener('click', () => {
              if (this.onDelete) {
                  this.onDelete(id);
              }
          });
      });
  }

  enableEditing(todoItem) {
      const inputs = todoItem.querySelectorAll('input:not(.todo-checkbox), select');
      const editButton = todoItem.querySelector('.edit-btn');
      const saveButton = todoItem.querySelector('.save-btn');

      inputs.forEach(input => {
          input.removeAttribute('readonly');
          input.removeAttribute('disabled');
      });
      
      editButton.style.display = 'none';
      saveButton.style.display = 'inline-block';
  }

  saveEdits(todoItem) {
      const id = todoItem.dataset.id;
      const updates = {
          text: todoItem.querySelector('.edit-todo').value,
          dueDate: todoItem.querySelector('.edit-date').value,
          priority: todoItem.querySelector('.edit-priority').value,
          category: todoItem.querySelector('.edit-category').value
      };

      if (this.onEdit) {
          this.onEdit(id, updates);
      }

      const inputs = todoItem.querySelectorAll('input:not(.todo-checkbox), select');
      const editButton = todoItem.querySelector('.edit-btn');
      const saveButton = todoItem.querySelector('.save-btn');

      inputs.forEach(input => {
          input.setAttribute('readonly', 'true');
          input.setAttribute('disabled', 'true');
      });
      
      editButton.style.display = 'inline-block';
      saveButton.style.display = 'none';
  }

  setOnEdit(callback) {
      this.onEdit = callback;
  }

  setOnDelete(callback) {
      this.onDelete = callback;
  }

  setOnToggle(callback) {
      this.onToggle = callback;
  }

  updateCategories(categories) {
      this.categories = categories;
  }
}
