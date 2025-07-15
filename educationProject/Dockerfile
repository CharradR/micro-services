# Build stage
FROM node:20 as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:1.25-alpine as production-stage

# Supprime les fichiers nginx par défaut pour éviter les conflits
RUN rm -rf /usr/share/nginx/html/*

# Copie les fichiers générés de l'app Angular
COPY --from=builder /app/dist/education-project /usr/share/nginx/html

# Copie ton fichier nginx custom (si tu en as un)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Commande par défaut
CMD ["nginx", "-g", "daemon off;"]
