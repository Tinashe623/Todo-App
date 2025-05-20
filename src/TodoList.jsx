import { useState } from "react";
const TodoList = () => {
  const [tasks, setTasks] = useState([
    "eat breakfast",
    "take a shower",
    "woke the dog",
  ]);
  const [newTasks, setNewTasks] = useState("");

  const handleInputChange = (event) => {
    setNewTasks(event.target.value);
  };
  const addTask = () => {};
  const deleteTask = (index) => {};
  const moveTaskUp = (index) => {};
  const moveTaskDown = (index) => {};

  return (
    <>
      <main className="to-do-list">
        <h1>To-Do-List</h1>

        <section>
          <input
            type="text"
            value={newTasks}
            placeholder="Enter a task ..."
            onChange={handleInputChange}
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </section>
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <span className="text">{task}</span>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                Delete
              </button>

              <button className="move-btn" onClick={() => moveTaskUp(index)}>
                ☝️
              </button>
              <button className="move-btn" onClick={() => moveTaskDown(index)}>
                👇
              </button>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
};
export default TodoList;
