# Step 1: Use Node.js official image as base (version 18 in this case)
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Step 4: Install the dependencies from package.json
RUN npm install

# Step 5: Copy the rest of the application files (controllers, routes, models, etc.) into the container
COPY . .

# Step 6: Expose the port your server is listening to (e.g., port 3001 in your case)
EXPOSE 3001

# Step 7: Start the application (entry point of your application, can be server.js or app.js)
CMD ["node", "server.js"]
