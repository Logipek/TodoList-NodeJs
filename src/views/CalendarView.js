import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default class CalendarView {
  constructor(container) {
    this.container = container;
    this.calendar = null;
    this.onEventClick = null;
  }

  render(todos) {
    if (!this.calendar) {
      this.calendar = new Calendar(this.container, {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        events: this.transformTodosToEvents(todos),
        eventClick: (info) => {
          this.onEventClick?.(info.event.id);
        },
        eventContent: (info) => ({ html: info.event.title })
      });
      this.calendar.render();
    } else {
      this.calendar.removeAllEvents();
      this.calendar.addEventSource(this.transformTodosToEvents(todos));
    }
  }

  transformTodosToEvents(todos) {
    return todos.map((todo) => ({
      id: todo.id.toString(),
      title: todo.text,
      start: todo.dueDate,
      backgroundColor: this.getPriorityColor(todo.priority),
      borderColor: this.getPriorityColor(todo.priority),
      textColor: '#ffffff',
      className: todo.completed ? 'completed-event' : ''
    }));
  }

  getPriorityColor(priority) {
    const colors = {
      low: '#48bb78', // vert
      medium: '#ed8936', // orange
      high: '#f56565' // rouge
    };
    return colors[priority] || colors.medium;
  }

  setOnEventClick(callback) {
    this.onEventClick = callback;
  }
}
