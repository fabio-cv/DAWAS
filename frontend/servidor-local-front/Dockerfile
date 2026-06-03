FROM node:20-alpine

WORKDIR /app

RUN corepack enable
dfsf
COPY package.json ./
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
