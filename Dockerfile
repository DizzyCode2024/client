FROM node:20-alpine

WORKDIR /src

RUN apk update

RUN apk add --no-cache git

RUN git clone https://github.com/DizzyCode2024/client.git .

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
