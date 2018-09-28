import * as path from 'path';
import { Server } from 'http';
import express from 'express';
import { createResolvers, typeDefs } from "../src/gql/schema";
import { ApolloServer } from "apollo-server-express";
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import fetch from 'node-fetch';
import { rootReducer } from '../src/redux/reducers/index';
import { testAction } from '../src/redux/actions/index';
import { FakeDB } from '../src/gql/mockDB';

export function createServer(fakeDB: FakeDB) {
  const app = express();
  const server = new Server(app);

  const gqlServer = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers: createResolvers(fakeDB),
  });

  gqlServer.applyMiddleware({ app });

  // start the server
  const port = process.env.NODE_PORT;

  return new Promise((resolve: any, reject: any) => {
    server.listen(port, (err: any) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(server);
        console.log(process.env.NODE_ENV);
        console.info(`Server is running on http://localhost:${port}`);
      }
    });
  });

}

export function createClient() {
  const store = createStore(rootReducer);

  // start the server
  const port = process.env.NODE_PORT;

  // lets put something in redux store
  store.dispatch(testAction({text: 'some test string!'}));

  const initState = JSON.stringify(store.getState());

  const apolloClient = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: `http://127.0.0.1:${port}/graphql`,
      // credentials: 'same-origin',
      fetch : fetch as any
    }),
    cache: new InMemoryCache(),
  });

  return { store, apolloClient };
}


