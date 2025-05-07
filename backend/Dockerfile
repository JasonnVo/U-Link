FROM node:18

# Set work directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy rest of backend code
COPY . .

# Expose backend port
EXPOSE 4000

# Run backend
CMD ["node", "index.js"]
