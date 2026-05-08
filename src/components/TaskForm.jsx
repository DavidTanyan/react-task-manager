import { useState } from "react";

function TaskForm({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
      />
      <button>Add</button>
    </form>
  );
}

export default TaskForm;