FROM node:23-alpine

# Set the working directory
WORKDIR /src

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the application port
EXPOSE 3005

# Start the application
CMD ["node", "dist/index.js"]