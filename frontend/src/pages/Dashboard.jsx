import React, { useState, useMemo } from "react";

const priorities = ["Low", "Medium", "High"];

function Dashboard() {
  // Tasks state
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Example Task",
      description: "This is a sample task.",
      completed: false,
      dueDate: "",
      priority: "Medium",
    },
  ]);

  // New task inputs
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");


  // Filter and search state
  const [filter, setFilter] = useState("all"); // all / completed / pending
  const [search, setSearch] = useState("");

  // Edit task state
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Add new task handler
  const addTask = () => {
    if (!newTitle.trim()) return alert("Task title is required");
    const newTask = {
      id: Date.now(),
      title: newTitle,
      description: newDesc,
      completed: false,
      dueDate: newDueDate,
      priority: newPriority,
    };
    
    setTasks([newTask, ...tasks]);
    // Reset inputs
    setNewTitle("");
    setNewDesc("");
    setNewDueDate("");
    setNewPriority("Medium");
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Start editing task
  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditDueDate(task.dueDate);
    setEditPriority(task.priority);
  };

  // Save edit
  const saveEdit = (id) => {
    if (!editTitle.trim()) return alert("Task title is required");
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: editTitle,
              description: editDesc,
              dueDate: editDueDate,
              priority: editPriority,
            }
          : task
      )
    );
    cancelEdit();
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDesc("");
    setEditDueDate("");
    setEditPriority("Medium");
  };

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
      })
      .filter((task) => {
        const searchLower = search.toLowerCase();
        return (
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
        );
      });
  }, [tasks, filter, search]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Stats */}
      <div className="mb-6 flex justify-between text-lg font-semibold">
        <div>Total Tasks: {totalTasks}</div>
        <div>Completed: {completedTasks}</div>
        <div>Pending: {pendingTasks}</div>
      </div>

      {/* New Task Form */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Task title *"
            className="w-full border rounded px-3 py-2"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Description (optional)"
            className="w-full border rounded px-3 py-2"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            rows={3}
          />
          <div className="flex space-x-4">
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="border rounded px-3 py-2"
              title="Due Date"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded ${
              filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 rounded ${
              filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Pending
          </button>
        </div>
        <input
          type="search"
          placeholder="Search tasks..."
          className="border rounded px-3 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.length === 0 && (
          <li className="text-center text-gray-500">No tasks found.</li>
        )}
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`bg-white p-4 rounded mb-3 shadow flex flex-col md:flex-row md:items-center md:justify-between ${
              task.completed ? "opacity-50 line-through" : ""
            }`}
          >
            {/* Left side - checkbox and info */}
            <div className="flex items-center space-x-3 flex-grow ">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="h-5 w-5"
                title="Mark completed"
              />
              <div className="flex flex-col">
                {editId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border rounded px-2 py-1 mb-1"
                    />
                    <textarea
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                      className="border rounded px-2 py-1 mb-1"
                      rows={2}
                    />
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-lg">{task.title}</div>
                    {task.description && (
                      <div className="text-gray-600 text-sm">{task.description}</div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right side - due date, priority, actions */}
            <div className="flex items-center space-x-3 mt-3 md:mt-0">
              {editId === task.id ? (
                <>
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {priorities.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => saveEdit(task.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    title="Save"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                    title="Cancel"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div className="text-sm text-gray-700">
                    Due: {task.dueDate || "No due date"}
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-white text-sm ${
                      task.priority === "High"
                        ? "bg-red-600"
                        : task.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                  >
                    {task.priority}
                  </div>
                  <button
                    onClick={() => startEdit(task)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    title="Delete"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
