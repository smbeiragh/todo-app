# How to run it

## Run it on your local machine

**Clone repository**
```bash
$ git clone <repo_url>
$ cd <repo_dir>
$ yarn 
```

**Install dependencies**
```bash
$ cd <repo_dir>

# using yanrn
$ yarn 

#using npm
$ npm i
 ```
**Run**

*production mode* 
```bash
## build server and client bundles
$ yarn build
## start production server
$ yarn start 
```

*Development mode*
```bash
## start server bundling and watching
$ yarn run watch
## start development server
$ yarn run start:dev 
```

**Testing**
```bash
yarn test
```

# Run it on Docker container

## build image
```bash
$ docker build -t todo-app .
```

## production
```bash
$ docker run --name my-todo-app -p 3000:3000 todo-app

# To view the application, you need to know the ip address of your virtual machine
$ docker-machine ip default
```

## development
On first run delete node_modules directory on your local machine 

```bash
## run container & watch server bundle
$ docker-compose up

## start node server  
$ docker exec -it <container name> /bin/bash
$ cd /project
$ NODE_ENV=development node ./index.js
```