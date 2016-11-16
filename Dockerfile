FROM mhart/alpine-node:7.1.0

EXPOSE 8081
WORKDIR /app
ENV NODE_ENV development

COPY package.json /app
RUN npm install

COPY . /app
RUN node_modules/.bin/gulp build-for-production

CMD [ "npm", "start" ]
# CMD [ "./node_modules/.bin/pm2", "start", "--no-daemon", "process.json" ]
