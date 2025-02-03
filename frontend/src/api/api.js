const API_URL = "http://127.0.0.1:8080";

// REGISTRO DE USUARIO
export const registerUser = async (username, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};

// LOGIN DE USUARIO
export const loginUser = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};


// ----------------- TAREAS -----------------------------
// 🔹 Obtener token desde localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
};

// 🔹 Obtener todas las tareas del usuario autenticado
export const getTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    return response.json();
};

// 🔹 Crear una nueva tarea
export const createTask = async (title) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ title, status: "pendiente" }),
    });
    return response.json();
};

// 🔹 Actualizar una tarea
export const updateTask = async (taskId, title, status) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ title, status }),
    });
    return response.json();
};

// 🔹 Eliminar una tarea
export const deleteTask = async (taskId) => {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    return response.json();
};
