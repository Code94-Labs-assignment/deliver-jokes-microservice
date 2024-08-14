# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if you are using npm) or yarn.lock (if you are using Yarn) or pnpm-lock.yaml (if you are using pnpm)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application's source code to the container
COPY . .

# Step 6: Build the NestJS application
RUN npm run build

# Step 7: Expose the port the app will run on
EXPOSE 9093

# Step 8: Define the command to run the app using the production build
CMD ["npm", "run", "start:prod"]
