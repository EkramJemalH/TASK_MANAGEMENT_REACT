import React, { useState } from "react";
import "./styles.css"; // Ensure you have this file for styling

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Add new task with user input
  const addTask = () => {
    if (!title || !description || !dueDate) {
      alert("Please fill out all fields.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    // Clear input fields
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  // Toggle completion status
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filtering & Sorting
  const filteredTasks = tasks
    .filter((task) =>
      filter === "all" ? true : task.completed === (filter === "completed")
    )
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : a.title.localeCompare(b.title)
    );

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>

      {/* Task Input Form */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Filters & Sorting */}
      <div className="filters">
        <label>Filter:</label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <label>Sort:</label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Due Date</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <div className="task-details">
              <strong>{task.title}</strong> - {task.description} (Due:{" "}
              {task.dueDate})
            </div>
            <div className="task-actions">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
