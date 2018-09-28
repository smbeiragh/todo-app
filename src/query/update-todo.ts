import gql from "graphql-tag";

export const updateToDoQuery = gql`
  mutation UpdateToDo ($id: String!, $title: String, $priority: Int, $dueDate: String, $done: Boolean) {
    updateToDo (id: $id, title: $title, priority: $priority, dueDate: $dueDate, done: $done) {
      id
      title
      priority
      dueDate
      done
    }
  }
`;
