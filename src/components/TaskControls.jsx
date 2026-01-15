import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const TaskControls = ({ 
  searchQuery, 
  setSearchQuery, 
  newTask, 
  setNewTask, 
  newCategory, 
  setNewCategory, 
  newDueDate, 
  setNewDueDate, 
  addTask, 
  categories, 
  filterCategory, 
  setFilterCategory 
}) => {
  return (
    <div className="controls">
      <div className="search-bar">
        <MagnifyingGlassIcon className="icon" />
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="add-section">
        <div className="input-wrapper">
          <input
            type="text"
            value={newTask}
            placeholder="Add a new task..."
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
        </div>
        <select 
          className="cat-select"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        >
          {categories.filter(c => c !== "All").map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input 
          type="date" 
          className="cat-select" 
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>Add</button>
      </div>

      <div className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-pill ${filterCategory === cat ? 'active' : ''}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskControls;
