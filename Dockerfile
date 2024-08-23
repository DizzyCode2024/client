FROM node:20-alpine

WORKDIR /src

RUN apk update

RUN apk add --no-cache git

RUN git clone https://github.com/DizzyCode2024/client.git .

RUN rm -f Dockerfile docker-compose.yml nginx.conf

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "dev", "--host", "0.0.0.0"]