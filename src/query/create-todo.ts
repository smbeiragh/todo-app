import gql from "graphql-tag";

export const createToDoQuery = gql`
  mutation CreateToDo ($title: String!, $priority: Int, $dueDate: String, $orderBy: String, $orderType: String) {
    createToDo (title: $title, priority: $priority, dueDate: $dueDate, orderBy: $orderBy, orderType: $orderType) {
      id
      title
      priority
      dueDate
      done
    }
  }
`;
