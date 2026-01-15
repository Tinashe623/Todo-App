# 📝 Premium React To-Do List App

A modern, highly functional, and visually stunning To-Do List application built with **React 19**. This project was designed to showcase premium UI/UX principles, modular architecture, and advanced task management features, making it a perfect addition to a professional portfolio.

---

## ✨ Features

### 🌟 Advanced Task Management
- **Smart Categorization**: Organize tasks with intelligent defaults that sync with your current view.
- **Due Dates & Tracking**: Set deadlines and track daily progress with a real-time header dashboard.
- **Inline Editing**: Double-click or use the pencil icon to modify tasks instantly with a professional focused state.
- **Auto-Scroll Behavior**: New tasks automatically scroll into view at the bottom, mimicking a smooth chatbot experience.
- **Task persistence**: Robust `localStorage` integration ensures your data stays safe between sessions.

### 🎨 Premium UI/UX
- **Modern Architecture**: Fully modular JSX and **Modular CSS** (`Dashboard.css`, `TaskControls.css`, etc.) for enterprise-grade maintainability.
- **Glassmorphic Design**: A sleek, translucent interface with subtle gradients and backdrop filters.
- **Refined Scrolling Experience**: 
  - **"Scrolling Underneath"**: The task list flows elegantly beneath a fixed header with a subtle fade effect.
  - **Desktop Aesthetic**: Scrollbars are hidden on desktop for a cleaner, strictly "app-like" look.
- **Smart Visual Feedback**: The entire UI (Add button, input borders, filter pills) dynamically changes color to match selected categories.
- **Mobile First Optimization**: Custom vertical space management ensures the app remains fully functional and spacious even on small screens.
- **Fluid Animations**: Custom `@keyframes` (like the `taskIn` bounce) make every interaction feel premium.

---

## 🏗️ Architecture

The project follows high-end industry standards for **Modular Architecture**:

- **📁 Components**: 
  - Each logic block (`Dashboard`, `TaskControls`, `TaskItem`) is self-contained.
  - **Modular CSS**: Every component imports its own scoped stylesheet, keeping the global `index.css` lean and focused on layout and design tokens.
- **🧠 State Management**: Optimized React Hooks for real-time search, filtering, and theme toggling.

---

## 🔧 Technologies Used

- **React 19**: Modern component-based architecture.
- **JavaScript (ES6+)**: Functional logic and state orchestration.
- **Modular Vanilla CSS**: Custom styling with CSS Variables, Grid, Flexbox, and Advanced Masking.
- **Heroicons**: Premium SVG icons for a consistent visual language.
- **Vite**: Ultra-fast build tool and developer experience.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tinashe623/Todo-App.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Todo-App
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

---

## 👨‍💻 Author

**Tinashe**
- GitHub: [@Tinashe623](https://github.com/Tinashe623)

---

## 📄 License

This project is licensed under the MIT License.
