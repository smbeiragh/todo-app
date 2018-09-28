import * as React from 'react';
import { Query, Mutation } from "react-apollo";
import { ToDoList } from './ToDoList';
import { ToDoAddForm } from './ToDoAddForm';
import { ToDoSort } from './ToDoSort';
import { getToDosQuery } from './../query/get-todos';
import { createToDoQuery } from "../query/create-todo";

type Props = {
  onSort: (orderBy: string) => void
  orderBy: string
}


export function ToDoApp(props: Props) {
  const { orderBy, onSort } = props;

  return (
    <div className={'c-toDoApp'}>
      <h1 className={'c-toDoApp__header'}>Todo list</h1>
      <Mutation
        mutation={createToDoQuery}
        update={(cache, { data: { createToDo } }) => {
          cache.writeQuery({
            query: getToDosQuery,
            variables: { orderBy },
            data: { getToDos: createToDo }
          });
        }}
      >
        {(createTodo, { data }) => (
          <ToDoAddForm
            className={'c-toDoApp__form'}
            onSubmit={ ({value}: {value: string}) => createTodo({ variables: {title: value, orderBy}}) }
          />
        )}
      </Mutation>
      <Query
        query={getToDosQuery}
        variables={{orderBy}}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <>
              <ToDoSort
                onChange={(value) => { onSort(value); refetch(); }}
                value={orderBy}
                className={''}
              />
            <ToDoList toDos={data.getToDos} refetch={refetch} orderBy={orderBy}/>
            </>
          )
        }}
      </Query>
    </div>
  )
}
