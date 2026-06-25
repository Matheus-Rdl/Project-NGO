# Estágio 1: Construção
FROM node:18-alpine AS build
WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG OLD_VITE_API_URL
ENV OLD_VITE_API_URL=$OLD_VITE_API_URL

ARG VITE_ENV
ENV VITE_ENV=$VITE_ENV

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servidor de Produção (Nginx)
FROM nginx:alpine
# Copia o build da etapa anterior para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Expõe a porta 80 do Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]