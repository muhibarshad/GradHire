# Step 1: Use Node.js to build the React app
FROM node:18 AS build

# Set the working directory for the frontend
WORKDIR /app

# Copy the package.json and package-lock.json (for installing dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Use Nginx to serve the React app
FROM nginx:alpine

# Step 3: Copy the build output from the previous step to Nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 4: Expose port 80 for the frontend
EXPOSE 80

# Step 5: Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
