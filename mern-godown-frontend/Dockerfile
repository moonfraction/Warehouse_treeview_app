# development environment
FROM node:18-bookworm-slim AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5050

ARG REACT_APP_API_URL
RUN REACT_APP_API_URL=${REACT_APP_API_URL} npm run build

# production environment
FROM caddy:2-alpine AS production

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=development /app/dist /srv