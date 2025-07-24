# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Set environment variables to skip husky during build
ENV HUSKY=0
ENV CI=true

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
# Skip husky prepare script during Docker build
RUN npm ci --ignore-scripts

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 