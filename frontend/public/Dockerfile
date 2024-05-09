FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
COPY ../.env.example .env
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY public/nginx.conf /etc/nginx/nginx.conf
