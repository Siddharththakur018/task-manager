import React, { useMemo, useState } from 'react'

const priorities = ["Low", "Medium", "High"];

function Dashboard() {
  const [tasks, setTasks] = useState([

    {
      id: 2,
      title: "Example Tasks 2",
      description: " This is a second sample task",
      completed: false,
      dueDate: "",
      priority: "Medium"
    },
    {
      id: 1,
      title: "Example Task",
      description: " This is a sample task",
      completed: false,
      dueDate: "",
      priority: "Medium"
    }
  ])

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");

  // filter
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");


  //edit task
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");

  //stats
  const totalTasks = tasks.length;
  const compledtedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - compledtedTasks;

  //add task
  const addTask = () => {
    if (!newTitle.trim()) return alert("Title is required");

    const newTask = {
      id: Date.now(),
      title: newTitle,
      description: newDesc,
      completed: false,
      dueDate: newDueDate,
      priority: newPriority,
    }

    setTasks([...tasks, newTask]);
    setNewTitle("");
    setNewDesc("");
    setNewDueDate("");
    setNewPriority("Medium");
  }

  //toggle completed
  const toggleCompleted = (id) => {
    setTasks(tasks.map((task) => {
      task.id === id ? { ...task, completed: !task.completed } : task
    }))
  }

  //delete task
  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  }

  //editing task
  const startEditing = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditDueDate(task.dueDate);
    setEditPriority(task.priority);
  }


  //cancel edit
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditDesc("");
    setEditDueDate("");
    setEditPriority("Medium")

  }



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
    <>
      <div className='max-w-4xl  mx-auto p-6'>

        {/*Stats */}
        <div className='mb-6 flex justify-between text-lg font-semibold'>
          <div>Total Tasks: {totalTasks}</div>
          <div>Completed Tasks: {compledtedTasks}</div>
          <div>Pending Tasks: {pendingTasks}</div>
        </div>

        {/*New Task Form */}
        <div className='bg-white p-4 rounded shadow mb-8'>
          <h2 className='text-xl font-bold mb-4'>Add New Task</h2>
          <div className='space-y-3'>
            <input
              type="text"
              placeholder='Task Title'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className='w-full border rounded px-3 py-2'
            />
            <textarea
              placeholder='Description (optional)'
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className='w-full border rounded px-3 py-2'
              rows={3}
            />
            <div className='flex space-x-4'>
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                title='Due Date'
                className='border rounded px-3 py-2'
              />

              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className='border rounded px-3 py-2'
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
              onClick={addTask}
            >Add Task</button>
          </div>
        </div>

        {/*Filter and search */}
        <div className='flex justify-between items-center mb-6'>
          <div className='space-x-4'>

            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >All</button>


            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >Completed</button>


            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >Pending
            </button>
          </div>

          <input
            type="search"
            placeholder='Search tasks...'
            className='border rounded px-3 py-1'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/*Task List */}
        <ul>
          {filteredTasks.length === 0 && (
            <li className=' text-red-500'>No tasks found</li>
          )}


          {filteredTasks.map((task) => {
            return (
              <li
                key={task.id}
                className={`p-4 mb-2 rounded shadow ${task.completed ? "bg-green-100" : "bg-white"}`}
              >
                {/* Left side */}
                <div className='flex items-center space-x-3 flex-grow'>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task.id)}
                    className='h-5 w-5'
                    title='Toggle Completed'
                  />

                  <div>
                    {editId === task.id ? (
                      <>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className='border rounded px-3 py-1'
                        />
                        <textarea
                          value={editDesc}
                          onchange={(e) => setEditDesc(e.target.value)}
                          className='border rounded px-3 py-1'
                          rows={2}
                        />
                      </>
                    ) : (
                      <>
                        <div className='font-semibold text-lg'>{task.title}</div>
                        {
                          task.description && <div className='text-gray-600'>{task.description}</div>
                        }
                      </>
                    )}
                  </div>
                </div>

                {/* Right side */}
                <div className='flex items-center space-x-3 mt-3'>
                  {editId === task.id ? (
                    <>
                      <input t
                        type="date"
                        value={editDueDate}
                        onchange={(e) => setEditDueDate(e.target.value)}
                        className='border rounded px-3 py-1'
                      />
                      <select
                        value={editPriority}
                        onchange={(e) => setEditPriority(e.target.value)}
                        className=''
                      >
                        {priorities.map((priority) => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => saveEdit(task.id)}
                        className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                        title='Save'
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                        title='Cancel'
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div className='text-sm text-gray-500'>
                        Due: {task.dueDate || "No due date"}
                      </div>

                      <div
                        className={`px-2 py-1 rounded text-white text-sm ${task.priority === "High" ? "bg-red-600" : task.priority === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}
                      >
                        {task.priority}
                      </div>
                      <button
                        onClick={() => startEditing(task)}
                        className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
                        title='Edit'
                      >
                        Edit
                      </button>
                    </>
                  )}

                </div>
              </li>
            )
          })}

        </ul>





      </div>
    </>
  )
}

export default Dashboard