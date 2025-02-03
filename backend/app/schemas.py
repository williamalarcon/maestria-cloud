from pydantic import BaseModel

# 🔹 Un solo modelo para Login y Registro
class UserAuth(BaseModel):
    username: str
    password: str

# 🔹 Modelo para crear tareas
class TaskCreate(BaseModel):
    title: str
    status: str  # Valores: "pendiente", "en progreso", "completado"

# 🔹 Modelo para actualizar tareas
class TaskUpdate(BaseModel):
    title: str
    status: str
