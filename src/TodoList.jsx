import { useState, useEffect, useMemo } from "react";
import Dashboard from "./components/Dashboard";
import TaskControls from "./components/TaskControls";
import TaskItem from "./components/TaskItem";

const CATEGORIES = ["All", "Work", "Personal", "Shopping", "Health", "Other"];

const TodoList = () => {
  // --- State ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("Work");
  const [newDueDate, setNewDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  
  // Editing State
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // --- Handlers ---
  const addTask = () => {
    if (newTask.trim() !== "") {
      const taskObj = {
        id: crypto.randomUUID(),
        text: newTask,
        completed: false,
        category: newCategory,
        dueDate: newDueDate || null,
        createdAt: new Date().toISOString()
      };
      setTasks((prev) => [taskObj, ...prev]);
      setNewTask("");
      setNewDueDate("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    setTasks(tasks.map(t => 
      t.id === editingId ? { ...t, text: editText } : t
    ));
    setEditingId(null);
  };

  const moveTask = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= tasks.length) return;
    
    const updated = [...tasks];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setTasks(updated);
  };

  // --- Filtered Tasks & Stats ---
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "All" || task.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tasks, searchQuery, filterCategory]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, percent };
  }, [tasks]);

  // --- Render Helpers ---
  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <main className="to-do-list">
      <Dashboard 
        stats={stats} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      <TaskControls 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        newTask={newTask}
        setNewTask={setNewTask}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        newDueDate={newDueDate}
        setNewDueDate={setNewDueDate}
        addTask={addTask}
        categories={CATEGORIES}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />

      <ol>
        {filteredTasks.map((task, index) => (
          <TaskItem 
            key={task.id}
            task={task}
            index={index}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            startEditing={startEditing}
            saveEdit={saveEdit}
            setEditingId={setEditingId}
            toggleComplete={toggleComplete}
            moveTask={moveTask}
            deleteTask={deleteTask}
            formatDate={formatDate}
            filteredTasksLength={filteredTasks.length}
          />
        ))}
        {filteredTasks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
            <p>No tasks found.</p>
          </div>
        )}
      </ol>
    </main>
  );
};

export default TodoList;
