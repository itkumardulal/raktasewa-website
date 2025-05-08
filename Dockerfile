FROM node:20.11.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --no-cache --verbose
RUN npm install @rollup/rollup-linux-x64-gnu@^4.21.0 --no-save || true

COPY . .

ENV VITE_API_URL=https://raktasewa-server-production.up.railway.app/api
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]