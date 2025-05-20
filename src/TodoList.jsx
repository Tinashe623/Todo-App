import { useState } from "react";
import {
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Handle input change
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  // Add task when button is clicked or Enter key is pressed
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask("");
    }
  };

  // Detect Enter key press inside input field
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Move task up
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

  // Move task down
  const moveTaskDown = (index) => {
    if (index === tasks.length - 1) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index + 1], updatedTasks[index]] = [
      updatedTasks[index],
      updatedTasks[index + 1],
    ];
    setTasks(updatedTasks);
  };

  return (
    <main className={`to-do-list ${darkMode ? "dark-mode" : "light-mode"}`}>
      <h1>To-Do List</h1>

      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Switch to Light Mode 🌞" : "Switch to Dark Mode 🌙"}
      </button>

      <section>
        <input
          type="text"
          value={newTask}
          placeholder="Enter a task ..."
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // ✅ Captures Enter key press
        />
        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </section>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>

            <button className="move-btn" onClick={() => moveTaskUp(index)}>
              <ChevronUpIcon className="icon" />
            </button>

            <button className="move-btn" onClick={() => moveTaskDown(index)}>
              <ChevronDownIcon className="icon" />
            </button>

            <button className="delete-btn" onClick={() => deleteTask(index)}>
              <TrashIcon className="icon" />
            </button>
          </li>
        ))}
      </ol>
    </main>
  );
};

export default TodoList;
