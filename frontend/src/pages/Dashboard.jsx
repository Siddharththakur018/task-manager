import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const priorities = ["Low", "Medium", "High"];
const API_URL = "http://localhost:3000/tasks";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", priority: "Medium" });
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editTask, setEditTask] = useState({ id: null, title: "", description: "", dueDate: "", priority: "Medium" });

  useEffect(() => {
    axios.get(API_URL).then(res => {
      if (res.data.result === "success") {
        const formattedTasks = res.data.data.map(task => ({ ...task, id: task._id }));
        setTasks(formattedTasks);
      }
    }).catch(console.error);
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    return { total, completed, pending: total - completed };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => (filter === "completed" ? task.completed : filter === "pending" ? !task.completed : true))
      .filter(task => task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase()));
  }, [tasks, filter, search]);

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return alert("Task title is required");
    try {
      const res = await axios.post(`${API_URL}/createTask`, { ...newTask, completed: false });
      if (res.data.result === "success") {
        setTasks([{ ...res.data.data, id: res.data.data._id }, ...tasks]);
        setNewTask({ title: "", description: "", dueDate: "", priority: "Medium" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    try {
      const res = await axios.put(`${API_URL}/${id}`, { ...task, completed: !task.completed });
      if (res.data.result === "success") {
        setTasks(tasks.map(t => (t.id === id ? { ...res.data.data, id: res.data.data._id } : t)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.data.result === "success") {
        setTasks(tasks.filter(task => task.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditStart = (task) => {
    setEditTask({ id: task.id, title: task.title, description: task.description, dueDate: task.dueDate, priority: task.priority });
  };

  const handleEditSave = async () => {
    if (!editTask.title.trim()) return alert("Task title is required");
    try {
      const res = await axios.put(`${API_URL}/${editTask.id}`, { ...editTask });
      if (res.data.result === "success") {
        setTasks(tasks.map(task => (task.id === editTask.id ? { ...task, ...editTask } : task)));
        setEditTask({ id: null, title: "", description: "", dueDate: "", priority: "Medium" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCancel = () => setEditTask({ id: null, title: "", description: "", dueDate: "", priority: "Medium" });

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 flex justify-between text-lg font-semibold text-gray-700">
        <span>Total Tasks: {stats.total}</span>
        <span>Completed: {stats.completed}</span>
        <span>Pending: {stats.pending}</span>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Task</h2>
        <div className="space-y-3">
          <input type="text" placeholder="Task title *" className="w-full border rounded px-4 py-2" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
          <textarea placeholder="Description (optional)" className="w-full border rounded px-4 py-2" rows={3} value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
          <div className="flex gap-4 items-center">
            <input type="date" className="border rounded px-4 py-2" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} />
            <select className="border rounded px-4 py-2" value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}>
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <button onClick={handleAddTask} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">Add Task</button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          {["all", "completed", "pending"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg ${filter === f ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <input type="search" placeholder="Search tasks..." className="border rounded px-4 py-2 w-64" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <ul className="space-y-4">
        {filteredTasks.length === 0 && <li className="text-center text-gray-500">No tasks found.</li>}
        {filteredTasks.map(task => (
          <li key={task.id} className={`bg-white p-5 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between ${task.completed ? "opacity-50 line-through" : ""}`}>
            <div className="flex items-center gap-4 flex-grow">
              <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task.id)} className="h-5 w-5" />
              <div className="flex flex-col w-full">
                {editTask.id === task.id ? (
                  <>
                    <input type="text" value={editTask.title} onChange={e => setEditTask({ ...editTask, title: e.target.value })} className="border rounded px-2 py-1 mb-2 w-full" />
                    <textarea value={editTask.description} onChange={e => setEditTask({ ...editTask, description: e.target.value })} className="border rounded px-2 py-1 mb-2 w-full" rows={2} />
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-lg text-gray-800">{task.title}</div>
                    {task.description && <div className="text-gray-600 text-sm">{task.description}</div>}
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3 md:mt-0">
              {editTask.id === task.id ? (
                <>
                  <input type="date" value={editTask.dueDate} onChange={e => setEditTask({ ...editTask, dueDate: e.target.value })} className="border rounded px-2 py-1" />
                  <select value={editTask.priority} onChange={e => setEditTask({ ...editTask, priority: e.target.value })} className="border rounded px-2 py-1">
                    {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <button onClick={handleEditSave} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">Save</button>
                  <button onClick={handleEditCancel} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition">Cancel</button>
                </>
              ) : (
                <>
                  <div className="text-sm text-gray-700">Due: {task.dueDate || "No due date"}</div>
                  <div className={`px-3 py-1 rounded text-white text-sm ${task.priority === "High" ? "bg-red-600" : task.priority === "Medium" ? "bg-yellow-500" : "bg-green-600"}`}>{task.priority}</div>
                  <button onClick={() => handleEditStart(task)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Edit</button>
                  <button onClick={() => handleDelete(task.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


