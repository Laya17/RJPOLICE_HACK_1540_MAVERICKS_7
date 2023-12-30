FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the working directory
COPY . .

# Change working directory to the Banking folder
WORKDIR /app/Banking

# Install dependencies for the Banking folder
RUN npm install

# Build and run the development server on port 8081
CMD ["npm", "run", "dev", "--", "--port", "8081"]
