# build stage

FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

# Force the move of .env file.
# COPY .env .env

RUN npm run build

# production stage

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d
# COPY nginx_config/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]