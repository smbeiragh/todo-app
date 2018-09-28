import { gql } from 'apollo-server-express';
import {FakeDB} from "./mockDB";

export const typeDefs = gql`
  type ToDo {
    id: String
    title: String
    priority: Int
    dueDate: String
    done: Boolean
  }
  
  type Query {
    getToDos(orderBy: String, orderType: String): [ToDo]
  }
  
  type Mutation {
    createToDo(title: String!, dueDate: String, priority: Int, orderBy: String, orderType: String): [ToDo]
    deleteToDo(id: String!): String
    updateToDo(id: String!, title: String, dueDate: String, priority: Int, done: Boolean): ToDo
  }
`;

export const createResolvers = (fakeDB: FakeDB) => ({
  Query: {
    getToDos: (root: any, {orderBy = 'title', orderType = 'ASC'} = {}) => {
      return fakeDB.getToDos({orderBy, orderType});
    }
  },
  Mutation: {
    createToDo: (
        root: any,
        { title = '', priority = 1, dueDate, done = false ,orderBy = 'title', orderType= 'ASC'}
        : { title: string, priority: number, dueDate: string, done: boolean, orderBy: string, orderType: string}
      ) => {
      fakeDB.createToDo({
        title,
        priority,
        dueDate,
        done
      });
      return fakeDB.getToDos({orderBy, orderType});
    },
    deleteToDo: (root: any, { id = '' } = {}) => {
      return fakeDB.deleteToDo({id});
    },
    updateToDo: (root: any, { id ,title, priority, dueDate, done} : ITodo = ({} as any)) : ITodo => {
      return fakeDB.updateToDo({ id ,title, priority, dueDate, done});
    },
  }
});
