📌 Guía de Despliegue de Task Manager
Este documento describe el proceso de instalación y despliegue de la aplicación Task Manager en una máquina virtual utilizando Docker y Docker Compose.

📌 1️⃣ Prerrequisitos
Antes de desplegar la aplicación, asegúrate de que la máquina virtual cumple con los siguientes requisitos:

✅ Sistema operativo: Ubuntu 20.04 / 22.04 o cualquier sistema compatible con Docker.
✅ Docker instalado (ver instrucciones abajo).
✅ Docker Compose instalado (ver instrucciones abajo).
✅ Puerto 3000 abierto (para el frontend).
✅ Puerto 8080 abierto (para la API backend).
✅ Puerto 5432 abierto (para PostgreSQL si deseas acceder desde otro cliente).
📌 2️⃣ Instalar Docker y Docker Compose
Ejecuta los siguientes comandos para instalar Docker y Docker Compose en la máquina virtual.

🔹 Instalar Docker
bash
Copiar
Editar
sudo apt update && sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
🔹 Verificar la instalación de Docker
bash
Copiar
Editar
docker --version
✅ Salida esperada (ejemplo):

Copiar
Editar
Docker version 20.10.17, build 100c701
🔹 Instalar Docker Compose
bash
Copiar
Editar
sudo apt install -y docker-compose
🔹 Verificar la instalación de Docker Compose
bash
Copiar
Editar
docker-compose --version
✅ Salida esperada (ejemplo):

Copiar
Editar
docker-compose version 1.29.2, build 5becea4c
📌 3️⃣ Clonar el Repositorio
Una vez que Docker está instalado, clona el repositorio con el código fuente.

bash
Copiar
Editar
git clone https://github.com/williamalarcon/maestria-cloud.git
cd maestria-cloud
📌 4️⃣ Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto con la siguiente configuración:

ini
Copiar
Editar
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=taskmanager
DATABASE_URL=postgresql://user:password@db:5432/taskmanager
📌 5️⃣ Construir y Ejecutar los Contenedores
Para iniciar la aplicación, ejecuta:

bash
Copiar
Editar
docker-compose up --build -d
✅ Esto hará lo siguiente:

🔹 Descargar las imágenes de PostgreSQL, backend y frontend.
🔹 Construir las imágenes del backend y frontend.
🔹 Levantar todos los servicios en modo desacoplado (-d).
Para verificar los contenedores en ejecución, usa:

bash
Copiar
Editar
docker ps
✅ Salida esperada (ejemplo):

bash
Copiar
Editar
CONTAINER ID   IMAGE                   PORTS                    NAMES
1234abcd       task-manager-frontend   0.0.0.0:3000->3000/tcp   task-manager-frontend-1
5678efgh       task-manager-backend    0.0.0.0:8080->8080/tcp   task-manager-backend-1
9abc0123       postgres:15             0.0.0.0:5432->5432/tcp   task-manager-db-1
📌 6️⃣ Acceder a la Aplicación
Una vez que la aplicación está corriendo, puedes acceder desde el navegador.

🔹 Frontend (React)

arduino
Copiar
Editar
http://IP_DE_TU_VM:3000
🔹 Backend API (FastAPI)

arduino
Copiar
Editar
http://IP_DE_TU_VM:8080/docs
🔹 Base de Datos (PostgreSQL) Si necesitas conectarte a la base de datos desde un cliente externo como DBeaver o PgAdmin, usa:

yaml
Copiar
Editar
Host: IP_DE_TU_VM
Usuario: user
Contraseña: password
Base de datos: taskmanager
Puerto: 5432
📌 7️⃣ Pruebas con Postman
1️⃣ Importa la colección de Postman desde docs/postman_collection.json.
2️⃣ Ejecuta las pruebas de los endpoints:

POST /register
POST /login
GET /tasks
POST /tasks
PUT /tasks/{id}
DELETE /tasks/{id}
📌 8️⃣ Detener y Reiniciar la Aplicación
Para detener la aplicación:

bash
Copiar
Editar
docker-compose down
Para reiniciar la aplicación:

bash
Copiar
Editar
docker-compose up -d
📌 9️⃣ Despliegue en Producción (Opcional)
Si deseas ejecutar la aplicación en producción, puedes utilizar docker-compose.prod.yml (si existe) o configurar NGINX como proxy reverso para manejar dominios y certificados SSL.

bash
Copiar
Editar
docker-compose -f docker-compose.prod.yml up -d
📌 1️⃣0️⃣ Solución de Problemas
🔹 Ver logs de los contenedores:
bash
Copiar
Editar
docker logs task-manager-backend-1
docker logs task-manager-db-1
🔹 Ver errores en tiempo real:
bash
Copiar
Editar
docker-compose logs -f
🔹 Reiniciar solo el backend:
bash
Copiar
Editar
docker restart task-manager-backend-1
🔹 Conectarse manualmente a PostgreSQL:
bash
Copiar
Editar
docker exec -it task-manager-db-1 psql -U user -d taskmanager
Si la base de datos no existe, créala manualmente:

sql
Copiar
Editar
CREATE DATABASE taskmanager;
