import { 
  TrashIcon, 
  ChevronUpIcon, 
  ChevronDownIcon, 
  CheckCircleIcon, 
  CalendarIcon, 
  PencilSquareIcon, 
  XMarkIcon, 
  CheckIcon 
} from "@heroicons/react/24/outline";
import "./TaskItem.css";

const TaskItem = ({ 
  task, 
  index, 
  editingId, 
  editText, 
  setEditText, 
  startEditing, 
  saveEdit, 
  setEditingId, 
  toggleComplete, 
  moveTask, 
  deleteTask, 
  formatDate, 
  filteredTasksLength 
}) => {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <button 
        className={`icon-btn check ${task.completed ? 'completed-btn' : ''}`}
        onClick={() => toggleComplete(task.id)}
      >
        <CheckCircleIcon className="icon" />
      </button>

      <div className="task-body" onClick={() => !editingId && toggleComplete(task.id)}>
        {editingId === task.id ? (
          <input 
            autoFocus
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') setEditingId(null);
            }}
            onBlur={saveEdit}
          />
        ) : (
          <>
            <span className="task-title">{task.text}</span>
            <div className="task-meta">
              <span className={`tag ${task.category.toLowerCase()}`}>{task.category}</span>
              {task.dueDate && (
                <span className="due-date">
                  <CalendarIcon className="icon" style={{ width: '12px', height: '12px' }} />
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="actions">
        {editingId === task.id ? (
          <>
            <button className="icon-btn" onClick={saveEdit}><CheckIcon className="icon" /></button>
            <button className="icon-btn" onClick={() => setEditingId(null)}><XMarkIcon className="icon" /></button>
          </>
        ) : (
          <>
            <button className="icon-btn" onClick={() => startEditing(task)}><PencilSquareIcon className="icon" /></button>
            <button className="icon-btn" onClick={() => moveTask(index, 'up')} disabled={index === 0}><ChevronUpIcon className="icon" /></button>
            <button className="icon-btn" onClick={() => moveTask(index, 'down')} disabled={index === filteredTasksLength - 1}><ChevronDownIcon className="icon" /></button>
            <button className="icon-btn delete" onClick={() => deleteTask(task.id)}><TrashIcon className="icon" /></button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
