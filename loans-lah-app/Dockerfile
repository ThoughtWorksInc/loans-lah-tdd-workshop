FROM node:12-alpine

ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm ci

CMD ["node", "build/app.js"]




