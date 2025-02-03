# Usar una imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Servir la aplicación con Vite
CMD ["npm", "run", "preview"]
