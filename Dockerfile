# Build stage
FROM node:20 AS build

WORKDIR /usr/src/app

# Install all dependencies
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20 AS production

WORKDIR /usr/src/app

# Copy the node_modules and built files from the build stage
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

# App runs on port 3000
EXPOSE 3000
CMD ["node", "public/index.js"]
