# Use a base Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /Client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your Node.js app is running on
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]