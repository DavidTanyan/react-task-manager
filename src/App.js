import { useState, useEffect } from "react";
import TaskList from "./components/TaskList.jsx/index.js";
import TaskForm from "./components/TaskForm.jsx";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");

    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.log("localStorage data is corrupted:", error);
      return [];
    }
  });

  // сохранение в localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskForm addTask={addTask} />

      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} />
    </div>
  );
}

export default App;
