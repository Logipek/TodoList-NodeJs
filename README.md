# Todo List MVC Application

A modern and intuitive task management application built with vanilla JavaScript, following the MVC pattern and using Webpack.

## 🌟 Features

- ✨ Modern UI inspired by shadcn/ui
- 📱 Responsive design
- 🎯 Complete task management (CRUD)
- 🎨 Multiple views:
  - Classic list
  - Kanban with drag & drop
  - Interactive calendar
- 🔍 Advanced filtering and search
- 🏷️ Custom categories
- 🌓 Light/dark theme
- 🔔 Due date notifications
- 💾 Data persistence (localStorage)

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Logipek/TodoList-NodeJs/todo-mvc.git

# Navigate to folder
cd TodoList-NodeJs

# Install dependencies
npm install
```

## 🔧 Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Key Dependencies
- Webpack (bundling)
- Tailwind CSS (styling)
- FullCalendar (calendar view)
- Babel (JavaScript compilation)

## 📦 Project Structure

```
todo-mvc/
├── src/
│   ├── models/
│   │   └── TodoModel.js
│   ├── views/
│   │   ├── ListView.js
│   │   ├── KanbanView.js
│   │   └── CalendarView.js
│   ├── controllers/
│   │   └── TodoController.js
│   ├── index.html
│   ├── index.js
│   └── styles.css
├── webpack.config.js
├── package.json
└── README.md
```

## 🚦 Usage

### Development

```bash
# Start development server
npm run start
```
Application will be available at `http://localhost:8081`

### Production

```bash
# Build for production
npm run build
```

## 💡 Detailed Features

### Task Management
- Create tasks with title, due date, priority, and category
- Edit and delete tasks
- Mark tasks as completed
- Drag & drop in Kanban view

### Filters and Search
- Filter by category and priority
- Real-time search
- Sort by date, priority, or category

### Customization
- Customizable light/dark theme
- Custom categories
- Locally saved preferences

## 🔒 Security

- User input validation
- Data sanitization
- XSS protection
- Secure local storage handling

## 🛠 Tech Stack

- JavaScript (ES6+)
- MVC Pattern
- Webpack 5
- Tailwind CSS
- FullCalendar
- LocalStorage API
- Notifications API

## 📱 Browser Support

- ✅ Chrome (latest versions)
- ✅ Firefox (latest versions)
- ✅ Safari (latest versions)
- ✅ Edge (latest versions)
- 📱 Full mobile support

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Development Guidelines

### Code Style
- Use ES6+ features
- Follow MVC pattern
- Maintain clean code principles
- Comment complex logic
- Use meaningful variable names

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Building
```bash
# Development build
npm run build:dev

# Production build
npm run build:prod
```

## 🐛 Known Issues

- None currently reported

## 📈 Future Improvements

- [ ] Add task recurrence
- [ ] Implement user authentication
- [ ] Add data export/import
- [ ] Create mobile app version
- [ ] Add team collaboration features

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📮 Contact

Logipek - [hugo-damion.me](https://hugo-damion.me)

Project Link: https://github.com/Logipek/TodoList-NodeJs

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com) - Styling framework
- [shadcn/ui](https://ui.shadcn.com) - UI inspiration
- [FullCalendar](https://fullcalendar.io) - Calendar component
- [Webpack](https://webpack.js.org) - Module bundler

## 🔄 Changelog

### [1.0.0] - 2024-01-31
- Initial release
- Basic task management features
- Multiple view implementations
- Theme support

### [1.1.0] - Coming soon
- Enhanced filtering
- Performance improvements
- Additional view options

## ⚙️ Configuration Options

```javascript
// webpack.config.js example
module.exports = {
  // Configuration options
};

// tailwind.config.js example
module.exports = {
  // Theme configuration
};
```

## 🆘 Troubleshooting

### Common Issues

1. **Installation Problems**
   ```bash
   npm cache clean --force
   npm install
   ```

2. **Build Errors**
   - Check Node.js version
   - Verify all dependencies are installed
   - Clear browser cache

## 📚 API Documentation

### TodoModel
```javascript
addTodo(todo)      // Add new todo
updateTodo(id)     // Update existing todo
deleteTodo(id)     // Delete todo
toggleTodo(id)     // Toggle todo completion
```

### Events
```javascript
onTodoAdd          // Triggered when todo is added
onTodoUpdate       // Triggered when todo is updated
onTodoDelete       // Triggered when todo is deleted
```
