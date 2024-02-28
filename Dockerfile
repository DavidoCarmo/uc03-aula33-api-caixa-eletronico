FROM node:20-alpine

ENV NODE_ENV=production
ENV PORT=5000

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm config set strict-ssl false

RUN npm install

COPY src/ .

EXPOSE 5000

CMD ["node", "server.js"]