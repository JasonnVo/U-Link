FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
COPY .env .env
RUN npm run build
EXPOSE 4000
CMD ["npm","start"]
