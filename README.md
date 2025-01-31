# Todo List MVC Application

Une application de gestion de tâches moderne et intuitive construite avec JavaScript vanilla, suivant le pattern MVC et utilisant Webpack.

## 🌟 Fonctionnalités

- ✨ Interface utilisateur moderne inspirée de shadcn/ui
- 📱 Design responsive
- 🎯 Gestion complète des tâches (CRUD)
- 🎨 Vues multiples :
  - Liste classique
  - Kanban avec drag & drop
  - Calendrier interactif
- 🔍 Filtrage et recherche avancés
- 🏷️ Catégories personnalisables
- 🌓 Thème clair/sombre
- 🔔 Notifications pour les tâches à échéance
- 💾 Persistance des données (localStorage)

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/Logipek/TodoList-NodeJs.git

# Accéder au dossier
cd TodoList-NodeJs

# Installer les dépendances
npm install
```

## 🔧 Configuration

### Prérequis
- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

### Dépendances principales
- Webpack (bundling)
- Tailwind CSS (styles)
- FullCalendar (vue calendrier)
- Babel (compilation JavaScript)

## 📦 Structure du projet

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

## 🚦 Utilisation

### Développement

```bash
# Lancer le serveur de développement
npm run start
```
L'application sera accessible sur `http://localhost:9000`

### Production

```bash
# Construire pour la production
npm run build
```

## 💡 Fonctionnalités détaillées

### Gestion des tâches
- Création de tâches avec titre, date d'échéance, priorité et catégorie
- Modification et suppression de tâches
- Marquage des tâches comme complétées
- Drag & drop dans la vue Kanban

### Filtres et recherche
- Filtrage par catégorie et priorité
- Recherche en temps réel
- Tri par date, priorité ou catégorie

### Personnalisation
- Thème clair/sombre personnalisable
- Catégories personnalisables
- Préférences sauvegardées localement

## 🔒 Sécurité

- Validation des entrées utilisateur
- Sanitization des données
- Protection XSS
- Gestion sécurisée du stockage local

## 🛠 Technologies utilisées

- JavaScript (ES6+)
- Pattern MVC
- Webpack 5
- Tailwind CSS
- FullCalendar
- LocalStorage API
- Notifications API

## 📱 Compatibilité

- ✅ Chrome (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ✅ Edge (dernières versions)
- 📱 Support mobile complet

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

## 📮 Contact

Logipek - https://hugo-damion.me/

Lien du projet : https://github.com/Logipek/TodoList-NodeJs

## 🙏 Remerciements

- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [FullCalendar](https://fullcalendar.io)
- [Webpack](https://webpack.js.org)
