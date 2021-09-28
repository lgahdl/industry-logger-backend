FROM node:14

WORKDIR /
COPY . .
RUN yarn install
RUN yarn build

EXPOSE 3000

ENTRYPOINT ["yarn", "start:prod"]