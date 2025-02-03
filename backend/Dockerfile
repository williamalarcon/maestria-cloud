# Usar una imagen oficial de Python
FROM python:3.12

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto 8080 para FastAPI
EXPOSE 8080

# Comando para ejecutar la aplicación con Uvicorn
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
