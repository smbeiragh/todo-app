import gql from "graphql-tag";

export const getToDosQuery = gql`
  query GetToDo ($orderBy: String, $orderType: String) {
    getToDos(orderBy: $orderBy, orderType: $orderType) {
      id
      title
      priority
      dueDate
      done
    }
  }
`;
