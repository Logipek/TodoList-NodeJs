// src/models/TodoModel.js
export default class TodoModel {
  constructor() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
      this.categories = JSON.parse(localStorage.getItem('categories')) || [
          'Travail', 'Personnel', 'Courses'
      ];
      this.observers = [];
  }

  addTodo(todo) {
      const newTodo = {
          id: Date.now(),
          text: todo.text,
          completed: false,
          dueDate: todo.dueDate,
          priority: todo.priority,
          category: todo.category,
          createdAt: new Date().toISOString()
      };
      this.todos.push(newTodo);
      this.save();
      this.notify();
  }

  updateTodo(id, updates) {
      const todoId = parseInt(id, 10);
      this.todos = this.todos.map(todo =>
          todo.id === todoId ? { ...todo, ...updates } : todo
      );
      this.save();
      this.notify();
  }

  removeTodo(id) {
      const todoId = parseInt(id, 10);
      this.todos = this.todos.filter(todo => todo.id !== todoId);
      this.save();
      this.notify();
  }

  toggleTodo(id) {
      const todoId = parseInt(id, 10);
      this.todos = this.todos.map(todo =>
          todo.id === todoId ? {...todo, completed: !todo.completed} : todo
      );
      this.save();
      this.notify();
  }

  moveTodoToStatus(id, status) {
      const todoId = parseInt(id, 10);
      this.todos = this.todos.map(todo =>
          todo.id === todoId ? {...todo, completed: status === 'done'} : todo
      );
      this.save();
      this.notify();
  }

  addCategory(category) {
      if (!this.categories.includes(category)) {
          this.categories.push(category);
          localStorage.setItem('categories', JSON.stringify(this.categories));
          this.notify();
          return true;
      }
      return false;
  }

  removeCategory(category) {
      this.categories = this.categories.filter(cat => cat !== category);
      localStorage.setItem('categories', JSON.stringify(this.categories));
      this.notify();
  }

  getCategories() {
      return this.categories;
  }

  filterTodos(filters = {}) {
      return this.todos.filter(todo => {
          const categoryMatch = !filters.category || todo.category === filters.category;
          const priorityMatch = !filters.priority || todo.priority === filters.priority;
          const searchMatch = !filters.search || 
              todo.text.toLowerCase().includes(filters.search.toLowerCase());
          return categoryMatch && priorityMatch && searchMatch;
      });
  }

  sortTodos(sortBy) {
      const sortedTodos = [...this.todos];
      switch(sortBy) {
          case 'dueDate':
              sortedTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
              break;
          case 'priority': {
              const priorityOrder = { high: 0, medium: 1, low: 2 };
              sortedTodos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
              break;
          }
          case 'category':
              sortedTodos.sort((a, b) => a.category.localeCompare(b.category));
              break;
          default:
              return sortedTodos;
      }
      return sortedTodos;
  }

  save() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  subscribe(observer) {
      this.observers.push(observer);
  }

  notify() {
      this.observers.forEach(observer => observer(this.todos));
  }
}
