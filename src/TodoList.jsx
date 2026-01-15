import { useState, useEffect } from "react";
import {
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const TodoList = () => {
  // Initialize state from localStorage
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
  
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Sync tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Sync theme to body class and localStorage
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

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const taskObj = {
        id: crypto.randomUUID(),
        text: newTask,
        completed: false
      };
      setTasks((prevTasks) => [...prevTasks, taskObj]);
      setNewTask("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  };

  const moveTaskDown = (index) => {
    if (index === tasks.length - 1) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index + 1], updatedTasks[index]] = [
      updatedTasks[index],
      updatedTasks[index + 1],
    ];
    setTasks(updatedTasks);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <main className="to-do-list">
      <div className="toggle-container">
        <button 
          className="toggle-btn" 
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Theme"
        >
          {darkMode ? <SunIcon className="icon" /> : <MoonIcon className="icon" />}
        </button>
      </div>

      <h1>Today's Tasks</h1>

      <section>
        <input
          type="text"
          value={newTask}
          placeholder="What needs to be done?"
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          autoFocus
        />
        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </section>

      <ol>
        {tasks.map((task, index) => (
          <li key={task.id}>
            <button 
              className={`icon-btn ${task.completed ? 'completed-btn' : ''}`}
              onClick={() => toggleComplete(task.id)}
            >
              <CheckCircleIcon className={`icon ${task.completed ? 'text-green-500' : ''}`} />
            </button>

            <span 
              className={`text ${task.completed ? "completed" : ""}`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.text}
            </span>

            <div style={{ display: 'flex', gap: '4px' }}>
              <button 
                className="icon-btn" 
                onClick={() => moveTaskUp(index)}
                disabled={index === 0}
                style={{ opacity: index === 0 ? 0.3 : 1 }}
              >
                <ChevronUpIcon className="icon" />
              </button>

              <button 
                className="icon-btn" 
                onClick={() => moveTaskDown(index)}
                disabled={index === tasks.length - 1}
                style={{ opacity: index === tasks.length - 1 ? 0.3 : 1 }}
              >
                <ChevronDownIcon className="icon" />
              </button>

              <button className="icon-btn delete" onClick={() => deleteTask(task.id)}>
                <TrashIcon className="icon" />
              </button>
            </div>
          </li>
        ))}
        {tasks.length === 0 && (
          <p style={{ textAlign: 'center', opacity: 0.5, marginTop: '20px' }}>
            No tasks yet. Add one above!
          </p>
        )}
      </ol>
    </main>
  );
};

export default TodoList;
