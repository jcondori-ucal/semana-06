FROM node:22-alpine

WORKDIR /app

# Primero solo package*.json: Docker cachea la instalación si no cambian las dependencias
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
