import gql from "graphql-tag";

export const deleteToDoQuery = gql`
  mutation DeleteToDo ($id: String!) {
    deleteToDo (id: $id)
  }
`;