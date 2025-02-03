from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User, Task
from app.auth import hash_password, verify_password, create_access_token, get_current_user
from app.schemas import UserAuth, TaskCreate, TaskUpdate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔹 REGISTRO DE USUARIOS
@router.post("/register")
def register_user(request: UserAuth, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == request.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = hash_password(request.password)
    new_user = User(username=request.username, password_hash=hashed_password)

    db.add(new_user)
    db.commit()
    
    return {"message": "User created successfully"}

# 🔹 INICIO DE SESIÓN
@router.post("/login")
def login(request: UserAuth, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username).first()
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# 🔹 CREAR UNA NUEVA TAREA (Autenticación requerida)
@router.post("/tasks")
def create_task(request: TaskCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    new_task = Task(title=request.title, status=request.status, user_id=user["id"])
    db.add(new_task)
    db.commit()
    return {"message": "Task created successfully"}

# 🔹 OBTENER LAS TAREAS DEL USUARIO AUTENTICADO
@router.get("/tasks")
def get_tasks(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    tasks = db.query(Task).filter(Task.user_id == user["id"]).all()
    return tasks

# 🔹 ACTUALIZAR UNA TAREA (Autenticación requerida)
@router.put("/tasks/{task_id}")
def update_task(task_id: int, request: TaskUpdate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user["id"]).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task.title = request.title
    task.status = request.status
    db.commit()
    return {"message": "Task updated successfully"}

# 🔹 ELIMINAR UNA TAREA (Autenticación requerida)
@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user["id"]).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}
