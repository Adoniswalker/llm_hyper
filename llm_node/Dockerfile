# Use an official Node.js runtime as a parent image
FROM node:20.16.0-alpine3.20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy the current directory contents into the container
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 3000 for the API
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
