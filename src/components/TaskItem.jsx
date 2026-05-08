function TaskItem({ task, deleteTask, toggleTask }) {
  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <span onClick={() => toggleTask(task.id)}>
        {task.text}
      </span>

      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  );
}

export default TaskItem;