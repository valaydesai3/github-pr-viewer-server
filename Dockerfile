FROM node:20-alpine

ENV TZ=America/New_York

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "src/server.js"]
