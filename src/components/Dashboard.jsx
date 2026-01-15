import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Dashboard = ({ stats, darkMode, setDarkMode }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="stats">
          <h1>Today's Plan</h1>
          <p>{stats.completed} / {stats.total} tasks completed</p>
        </div>
        <button 
          className="toggle-btn" 
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Theme"
        >
          {darkMode ? <SunIcon className="icon" /> : <MoonIcon className="icon" />}
        </button>
      </div>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${stats.percent}%` }}></div>
      </div>
    </div>
  );
};

export default Dashboard;
