FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn prismagenerate 

EXPOSE 3000
# required for docker desktop port mapping

CMD ["yarn", "dev"]