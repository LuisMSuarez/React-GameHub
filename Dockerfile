# To build: docker build -t gamershub:latest .

# ---------- Stage 1: Build the Vite app ----------
# Use the official lightweight Node.js image to build the app
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first to install dependencies (leverages Docker cache)
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Build the Vite app for production (output will be in /app/dist)
RUN npm run build

# ---------- Stage 2: Serve the app with Nginx ----------
FROM nginx:alpine

# Remove the default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config that supports client-side routing
COPY nginx.conf /etc/nginx/conf.d/

# Copy the production build from the previous stage to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port only
EXPOSE 80
EXPOSE 443

# Start Nginx server in the foreground
CMD ["nginx", "-g", "daemon off;"]