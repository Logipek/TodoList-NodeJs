// src/index.js
import TodoModel from './models/TodoModel';
import ListView from './views/ListView';
import KanbanView from './views/KanbanView';
import CalendarView from './views/CalendarView';
import TodoController from './controllers/TodoController';

// Importation des styles
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    const viewContainer = document.getElementById('viewContainer');
    
    // Créer le modèle
    const model = new TodoModel();
    
    // Créer les vues avec les catégories du modèle
    const views = {
        list: new ListView(viewContainer, model.getCategories()),
        kanban: new KanbanView(viewContainer, model.getCategories()),
        calendar: new CalendarView(viewContainer)
    };
    
    // Créer le contrôleur
    const controller = new TodoController(model, views);
    
    // Initialiser le thème
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Définir la vue active
    const currentView = localStorage.getItem('currentView') || 'list';
    document.querySelector(`[data-view="${currentView}"]`)?.classList.add('active');
});
