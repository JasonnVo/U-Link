FROM node:18

# Set work directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy rest of backend code
COPY ./db.js ./
COPY ./index.js ./

# Expose backend port
EXPOSE 8080

# Run backend
CMD ["node", "index.js"]