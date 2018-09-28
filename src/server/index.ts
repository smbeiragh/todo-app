import * as path from 'path';
import { Server } from 'http';
import express from 'express';
import { createResolvers, typeDefs } from "../gql/schema";
import { ApolloServer } from "apollo-server-express";
import { FakeDB } from './../gql/mockDB';

const app = express();
const server = new Server(app);

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev').default);
}

const gqlServer = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers: createResolvers(new FakeDB()),
});

gqlServer.applyMiddleware({ app });


// server static assets
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// universal routing and rendering
app.use(function (request: any, response: any, next: any) {
  require('./main').ssr(request, response, next);
});

// error handler
app.use(function (error: any, request: any, response: any, next: any) {
  require('./main').serverError(error, request, response, next);
});

if (module.hot) {
  // accept update of dependency
  module.hot.accept(['./main'], function () {
    // reload
    require('./main');
  });
}

// start the server
const port = process.env.NODE_PORT;
server.listen(port, (err: any) => {
  if (err) {
    return console.error(err);
  }
  console.log(process.env.NODE_ENV);
  console.info(`Server is running on http://localhost:${port}`);
});
