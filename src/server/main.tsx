/**
 * Created by sajjad on 5/29/18.
 */
import fs from 'fs';
import path from 'path';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { App } from '../components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import fetch from 'node-fetch';
import { rootReducer } from './../redux/reducers';
import { testAction } from './../redux/actions';

const port = process.env.NODE_PORT;
const isProduction = process.env.NODE_ENV === 'production';

let manifest: any = {
  "main.css": "/assets/dist/main.css",
  "main.js": "/assets/dist/main.js"
};

if (isProduction) {
  try {
    manifest  = JSON.parse(fs.readFileSync(path.resolve('./public/assets/dist/manifest.json')).toString());
  }catch(e){
    console.error(e);
  }
}

export function ssr(request: any, response: any, next: any) {

  const store = createStore(rootReducer);

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

  renderToStringWithData(
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  )
    .then((content) => {
      response.status(200);
      response.send(`<!DOCTYPE html>
         <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>ToDo List App!</title>
            ${ isProduction ? `<link rel="stylesheet" type="text/css" href="${manifest['main.css']}">` : ''}
          </head>
          <body>
            <div id="root">${content}</div>
            <script type="application/javascript"> 
                window.__INIT_STATE = ${initState}
                window.__APOLLO_STATE__ = ${JSON.stringify(apolloClient.extract())};
            </script>    
            <script src="${manifest['main.js']}"></script>
          </body>
        </html>
        `);
    })
    .catch((error) => {
      console.error('RENDERING ERROR:', error);
      next(error);
    });

}

// catch any exception as 5XX http err
export function serverError(err: any, request: any, response: any, next: any) {
  console.error('>>>>> ', err, err.networkError ? err.networkError.result : '');
  response.status(500);
  response.send(`<pre>${err}/r/n ${err.stack}/r/n${err.networkError ? JSON.stringify(err.networkError.result, null, 2) : ''}</pre>`);
}
