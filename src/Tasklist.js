import { useState, useEffect } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { name: newTask, completed: 0, total: 64 }]);
    setNewTask("");
  };

  const updateTask = (index, completed) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = Math.min(completed, updatedTasks[index].total);
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-grow"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addTask}>Add</button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task, index) => {
          const percentage = Math.round((task.completed / task.total) * 100);
          return (
            <li key={index} className="p-3 border rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{task.name}</span>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded h-4 mb-2 overflow-hidden">
                <div 
                  className="h-4 rounded transition-all duration-500" 
                  style={{ 
                    width: `${percentage}%`, 
                    background: `rgb(${255 - (percentage * 2)}, ${percentage * 2}, 50)`,
                  }}
                ></div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="border p-1 w-16"
                  value={task.completed}
                  onChange={(e) => updateTask(index, parseInt(e.target.value) || 0)}
                  min="0"
                  max={task.total}
                />
                <span>
                  {task.completed} / {task.total} ({percentage}%)
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
