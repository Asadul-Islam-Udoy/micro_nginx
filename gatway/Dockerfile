FROM node:18-alpine

WORKDIR /app

# Corrected path to copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the service files
COPY . .

EXPOSE 5000
CMD ["npm", "run", "dev"]
