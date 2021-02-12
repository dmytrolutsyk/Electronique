FROM node:12.17.0-alpine
WORKDIR /app
COPY package.json .
COPY tsconfig.json .
RUN npm install
COPY src .
COPY . .

RUN npm run build
EXPOSE 3000

CMD ["node", "./dist/www.js"]