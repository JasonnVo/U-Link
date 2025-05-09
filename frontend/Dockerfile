FROM node:18

# Set work directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of frontend code
COPY . .

# Build the production React app
RUN npm run build

# Install serve globally to serve the static build
RUN npm install -g serve

# Expose frontend port
EXPOSE 3000

# Serve the built frontend
CMD ["serve", "-s", "dist"]