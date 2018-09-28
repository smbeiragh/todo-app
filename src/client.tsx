/**
 * Created by sajjad on 3/14/18.
 */
import 'core-js';
import * as React from 'react';
import { hydrate } from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo"
import { InMemoryCache } from "apollo-cache-inmemory";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'normalize.css/normalize.css';
import './../public/assets/scss/main.scss'
import { App } from './components/App';
import { rootReducer } from './redux/reducers';

const store = createStore(rootReducer, (window as any).__INIT_STATE);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
});

function renderApp({ App }: { App: (props:any) => JSX.Element }) {
  hydrate(
    (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <App/>
        </Provider>
      </ApolloProvider>
    ),
    document.getElementById('root')
  );
}

window.onload = () => {
  renderApp({ App });
};

if (module.hot) {
  module.hot.accept(['./components/App'], () => {
    const NewApp = require('./components/App').App;
    renderApp({
      App: NewApp
    });
  });
}
