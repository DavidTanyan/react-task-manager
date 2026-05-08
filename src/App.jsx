import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  // save
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const clearAll = () => setTasks([]);

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Task Manager 🚀</h1>

      <TaskForm addTask={addTask} />

      {/* FILTERS */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* INFO */}
      <p>
        Total: {tasks.length} | Done:{" "}
        {tasks.filter((t) => t.completed).length}
      </p>

      <button onClick={clearAll}>Clear All</button>

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />
    </div>
  );
}

export default App;