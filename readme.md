# Despliegue de la Aplicación Task Manager 🚀

Este documento detalla el proceso para desplegar la aplicación Task Manager en un ambiente de producción o desarrollo.

---

## 📌 Prerrequisitos

Antes de iniciar el despliegue, asegúrate de contar con los siguientes requisitos:

- **Sistema Operativo**: Linux o Windows con WSL2.
- **Docker y Docker Compose** instalados.
- **Git** instalado para clonar el repositorio.
- **Acceso a una máquina virtual o servidor en la nube** (AWS, GCP, Azure o cualquier otro proveedor).

---

## 🚀 Paso a Paso para el Despliegue

### 1️⃣ Clonar el repositorio

```sh
git clone https://github.com/williamalarcon/maestria-cloud.git
cd maestria-cloud


# Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto con las siguientes variables:
DATABASE_URL=postgresql://user:password@db:5432/taskmanager
SECRET_KEY=supersecretkey

🔹 Nota: Asegúrate de reemplazar user, password y db con los valores reales de tu base de datos.

# Construir y levantar los contenedores con Docker Compose
docker-compose up --build -d
✅ Esto iniciará los contenedores de la base de datos, backend y frontend.

# Verificar que los contenedores estén corriendo
Ejecuta:

docker ps
Debe mostrar los siguientes servicios en ejecución:

CONTAINER ID   IMAGE                   PORTS                    NAMES
xxxxxx         task-manager-frontend   0.0.0.0:3000->3000/tcp   task-manager-frontend-1
xxxxxx         task-manager-backend    0.0.0.0:8080->8080/tcp   task-manager-backend-1
xxxxxx         postgres:15             0.0.0.0:5432->5432/tcp   task-manager-db-1

# Acceder a la Aplicación
Frontend: http://localhost:3000
Backend (API): http://localhost:8080/docs (Swagger UI)
Base de Datos: Conéctate a PostgreSQL en localhost:5432

# Importar la Documentación del API en Postman
Importa el archivo postman_collection.json en Postman para probar los endpoints de la API.

🔥 Detener los Contenedores
Si necesitas detener la aplicación, ejecuta:

docker-compose down
Para eliminar volúmenes y datos persistentes:

docker-compose down -v


LINK VIDEO:

https://uniandes-my.sharepoint.com/:v:/g/personal/w_alarcona_uniandes_edu_co/ETEzwzxZmc1FjCOBEmCmVNYBjztlmjHK7c9Ebhp8ePaavg?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=6ybAVH
