FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
# the volume will replace this, but we need node_modules
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]