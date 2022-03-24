apt-get install -y docker-ce-cli
FROM node:8.11
WORKDIR /front_end
COPY ./package*.json /front_end
RUN npm install
COPY / /front_end
RUN npm run build
CMD ["npx", "serve", "-s", "build"]
EXPOSE 3000
