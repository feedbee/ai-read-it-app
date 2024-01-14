# Stage 1: Build the React application
FROM node:14 as build

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the React application from Nginx
FROM nginx:stable-alpine

# Copy the build output to replace the default Nginx contents
COPY --from=build /app/build /usr/share/nginx/html
COPY docker/dyn-conf.sh /docker-entrypoint.d/99-dyn-conf.sh
COPY docker/dyn-conf-template.js /usr/share/nginx/dyn-conf/dyn-conf-template.js
COPY public/dyn-conf.js /usr/share/nginx/dyn-conf/dyn-conf.js

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Start Nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]
