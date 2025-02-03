import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/api";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    // 🔹 Obtener lista de tareas
    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // 🔹 Crear nueva tarea
    const handleCreateTask = async () => {
        if (newTask.trim() === "") {
            alert("El título de la tarea no puede estar vacío.");
            return;
        }
        try {
            await createTask(newTask);
            setNewTask("");
            fetchTasks();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    // 🔹 Actualizar tarea
    const handleUpdateTask = async (taskId, newTitle, newStatus) => {
        try {
            await updateTask(taskId, newTitle, newStatus);
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // 🔹 Eliminar tarea
    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            <h1>Mis Tareas</h1>

            {/* Input para nueva tarea */}
            <input
                type="text"
                placeholder="Nueva tarea..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleCreateTask}>Agregar Tarea</button>

            {/* Lista de tareas */}
            <ul>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task.id}>
                            <input
                                type="text"
                                value={task.title}
                                onChange={(e) => handleUpdateTask(task.id, e.target.value, task.status)}
                            />
                            <select
                                value={task.status}
                                onChange={(e) => handleUpdateTask(task.id, task.title, e.target.value)}
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="en progreso">En Progreso</option>
                                <option value="completado">Completado</option>
                            </select>
                            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
                        </li>
                    ))
                ) : (
                    <p>No hay tareas disponibles</p>
                )}
            </ul>
        </div>
    );
}

export default Tasks;
