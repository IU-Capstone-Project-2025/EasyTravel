# frontend/Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY frontend/package*.json ./
RUN npm ci

# Bundle app source
COPY frontend/ .

# Build the React app
RUN npm run build

# Serve the build folder
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]