import { createServer, createClient } from '../../../__mocks__/apollo';
import {FakeDB} from './../../gql/mockDB';
import { creatData } from '../../../__mocks__/db-data';
import { createToDoQuery } from '../create-todo';
import { getToDosQuery } from '../get-todos';

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

describe('GraphQL', () => {
  it('should create a ToDo', () => {
    return apolloClient.mutate({
      mutation: createToDoQuery,
      variables: {
        title: 'Todo 1',
        priority: 2,
        done: false
      }
    })
      .then((result: any) => {
        expect(result.data.createToDo).toBeDefined()
      });
  });

  it('should get ToDos', () => {
    return apolloClient.query({
      query: getToDosQuery,
    })
      .then((result: any) => {
        expect(result.data.getToDos).toBeDefined()
      });
  });

});
