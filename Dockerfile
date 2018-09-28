# ToDo app test

From node:8

MAINTAINER Sajjad M.Beiraghdar "smbeiragh@gmail.com"

WORKDIR /tmp
COPY package.json /tmp/
COPY package-lock.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install --silent

RUN mkdir /project
WORKDIR /project

# Copy host files
COPY . /project
RUN cp -a /tmp/node_modules /project/

# Build produaction bundles (server & client)
RUN cd /project && NODE_ENV=production npx webpack --config=/project/webpack.config.prod.js

## Set environment to "production" by default
ENV NODE_ENV production
ENV NODE_PORT 3000

## Allows port 3000 to be publicly available
EXPOSE 3000

CMD ["node", "./index.js"]
