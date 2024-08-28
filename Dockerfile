FROM --platform=linux/x86-64 node:16-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY . .

RUN npm i
RUN npm run build

FROM nginx:stable-alpine

RUN sed -i '1idaemon off;' /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /app

EXPOSE 80

CMD ["nginx"]