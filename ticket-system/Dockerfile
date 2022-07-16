# #stage 1
# FROM node:latest as node
# # WORKDIR .
# COPY . .
# RUN npm install
# RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /dist/ticket-system /usr/share/nginx/html