// src/views/KanbanView.js
export default class KanbanView {
  constructor(container, categories) {
      this.container = container;
      this.categories = categories;
      this.draggedItem = null;
      this.onEdit = null;
      this.onDelete = null;
      this.onMove = null;
      this.currentTodos = []; // Ajout pour stocker les todos
  }

  render(todos) {
      this.currentTodos = todos; // Sauvegarde des todos
      const columns = {
          todo: todos.filter(t => !t.completed),
          done: todos.filter(t => t.completed)
      };

      this.container.innerHTML = `
          <div class="kanban">
              <div class="kanban-column" data-status="todo">
                  <h3>À faire</h3>
                  <div class="kanban-items">
                      ${this.renderColumn(columns.todo)}
                  </div>
              </div>
              <div class="kanban-column" data-status="done">
                  <h3>Terminé</h3>
                  <div class="kanban-items">
                      ${this.renderColumn(columns.done)}
                  </div>
              </div>
          </div>
      `;

      this.initializeDragAndDrop();
      this.attachEventListeners();
  }

  renderColumn(todos) {
      return todos.map(todo => `
          <div class="kanban-item" draggable="true" data-id="${todo.id}">
              <div class="kanban-item-header">
                  <span class="priority priority-${todo.priority}">
                      ${todo.priority.toUpperCase()}
                  </span>
                  <span class="category">${todo.category}</span>
              </div>
              <div class="kanban-item-content">
                  <p>${todo.text}</p>
                  <small>Échéance: ${todo.dueDate}</small>
              </div>
              <div class="kanban-item-footer">
                  <button class="edit">✏️</button>
                  <button class="delete">🗑️</button>
              </div>
          </div>
      `).join('');
  }

  initializeDragAndDrop() {
      const items = this.container.querySelectorAll('.kanban-item');
      const columns = this.container.querySelectorAll('.kanban-column');

      items.forEach(item => {
          item.addEventListener('dragstart', () => {
              this.draggedItem = item;
              setTimeout(() => item.classList.add('dragging'), 0);
          });

          item.addEventListener('dragend', () => {
              item.classList.remove('dragging');
              this.draggedItem = null;
          });
      });

      columns.forEach(column => {
          column.addEventListener('dragover', e => {
              e.preventDefault();
              if (this.draggedItem) {
                  const afterElement = this.getDragAfterElement(column, e.clientY);
                  const container = column.querySelector('.kanban-items');
                  if (!afterElement) {
                      container.appendChild(this.draggedItem);
                  } else {
                      container.insertBefore(this.draggedItem, afterElement);
                  }
              }
          });

          column.addEventListener('drop', e => {
              e.preventDefault();
              if (this.draggedItem && this.onMove) {
                  const id = this.draggedItem.dataset.id;
                  const newStatus = column.dataset.status;
                  this.onMove(id, newStatus);
              }
          });
      });
  }

  getDragAfterElement(column, y) {
      const draggableElements = [...column.querySelectorAll('.kanban-item:not(.dragging)')];
      
      return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          
          if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
          } else {
              return closest;
          }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  attachEventListeners() {
      this.container.querySelectorAll('.kanban-item').forEach(item => {
          item.querySelector('.edit')?.addEventListener('click', () => {
              const id = parseInt(item.dataset.id, 10);
              const todo = this.currentTodos.find(t => t.id === id);
              if (todo && this.onEdit) {
                  this.onEdit(id, todo);
              }
          });

          item.querySelector('.delete')?.addEventListener('click', () => {
              const id = parseInt(item.dataset.id, 10);
              if (this.onDelete) {
                  this.onDelete(id);
              }
          });
      });
  }

  setOnEdit(callback) {
      this.onEdit = callback;
  }

  setOnDelete(callback) {
      this.onDelete = callback;
  }

  setOnMove(callback) {
      this.onMove = callback;
  }
}