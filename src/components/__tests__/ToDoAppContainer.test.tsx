import * as React from 'react';
import { ToDoAppContainer } from '../ToDoAppContainer';
import * as renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { Provider } from 'react-redux';
import { createServer, createClient } from '../../../__mocks__/apollo';
import {FakeDB} from './../../gql/mockDB';
import { creatData } from '../../../__mocks__/db-data';

let store: any;
let apolloClient: any;
let server: any;

beforeAll(() => {
  return createServer(new FakeDB(creatData()))
    .then((_server: any) => {
      server = _server;
      return new Promise((res: any, rej: any) => {
        setTimeout(() => {
          const all = createClient();
          store = all.store;
          apolloClient = all.apolloClient;
          res(server);
        }, 100);
      })
    });
});

afterAll((done) => {
  if (server) {
    server.close(done);
  } else {
    done()
  }
});

test('ToDoAppContainer should render', () => {

  const App = (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <ToDoAppContainer />
      </Provider>
    </ApolloProvider>
  );

  return getDataFromTree(App).then(() => {
    const component = renderer.create(App);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
