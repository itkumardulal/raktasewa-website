FROM node:20.11.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --no-cache --verbose

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]