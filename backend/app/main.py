from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import router
from app.database import Base, engine  # 🔹 Importamos Base y engine

app = FastAPI()

# 🔥 HABILITAR CORS 🔥
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔹 Permitir acceso desde cualquier origen (ajustar en producción)
    allow_credentials=True,
    allow_methods=["*"],  # 🔹 Permitir todos los métodos (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # 🔹 Permitir todos los headers
)

Base.metadata.create_all(bind=engine)
app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "API is running!"}
