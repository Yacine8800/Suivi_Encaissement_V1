# Build stage
FROM node:18.17.0-alpine AS builder
WORKDIR /app

# Copy only package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:18.17.0-alpine
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Set environment variables
ENV NODE_ENV production

# Run the application
CMD ["yarn", "start"]




# # Use the official Node.js image as the base image
# FROM node:18-alpine

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json (if available)
# COPY package*.json ./
# COPY yarn.lock ./

# # Install dependencies
# RUN yarn install

# # Copy the rest of the application files to the working directory
# COPY . .

# # Build the Next.js application
# RUN yarn build

# # Expose the port that the Next.js app will run on
# EXPOSE 2403

# # Start the Next.js app
# CMD ["yarn", "start"]
