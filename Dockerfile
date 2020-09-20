FROM nginx

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/keys /etc/nginx/keys
COPY ./example /home/app