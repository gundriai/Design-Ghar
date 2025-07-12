# Dockerfile for bhansaGharBE (Node.js backend)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose the backend port (change if your app uses a different port)
EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "start"]
