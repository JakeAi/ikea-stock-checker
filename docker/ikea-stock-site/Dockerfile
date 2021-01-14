#relative to mono root dir
FROM nginx:alpine
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY ./dist/apps/ikea-stock-site .
