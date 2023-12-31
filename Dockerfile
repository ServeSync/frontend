# Stage 1: Build the React app
FROM node:16.17.1-alpine3.15 as build

ARG VITE_APP_API_URL                  
ARG VITE_APP_RESETPASSWORD_URL
ARG VITE_APP_GOOGLE_MAPS_API_KEY

ENV VITE_APP_API_URL=$VITE_APP_API_URL
ENV VITE_APP_RESETPASSWORD_URL=$VITE_APP_RESETPASSWORD_URL
ENV VITE_APP_GOOGLE_MAPS_API_KEY=$VITE_APP_GOOGLE_MAPS_API_KEY

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the React app with Nginxs
FROM nginx:1.21.3-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]