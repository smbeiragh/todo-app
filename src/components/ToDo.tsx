import * as React from 'react';
import classnames from 'classnames';
import { Query, Mutation } from 'react-apollo';
import * as moment from 'moment';
import { deleteToDoQuery } from './../query/delete-todo';
import { getToDosQuery } from './../query/get-todos';
import { updateToDoQuery } from './../query/update-todo';
import { PriorityInput } from './PriorityInput';
import { ToDoDueDatePicker } from './ToDoDueDatePicker';
import { CoolCheckbox } from './CoolCheckbox';

type Props = {
  toDo: ITodo
  refetch: () => void
  orderBy: string
  className: string
};

export function ToDo({ toDo, className, refetch, orderBy }: Props) {
  return (
    <li className={classnames(className, 'c-toDo')}>
      <div className={'c-toDo__done'}>
        <Mutation mutation={updateToDoQuery}>
          {(updateTodo, { data }) => (
            <CoolCheckbox
              checked={toDo.done}
              onChange={(checked) => { updateTodo({ variables: {id: toDo.id, done: checked}}) }}
            />
          )}
        </Mutation>
      </div>
      <div className={'c-toDo__title'}>{toDo.title}</div>
      <Mutation
        mutation={updateToDoQuery}
        update={(cache, { data: { updateTodo } }) => {
          if (orderBy === 'dueDate') {
            refetch();
          }
        }}
      >
        {(updateTodo, { data }) => (
          <ToDoDueDatePicker
            className={'c-toDo__dueDate'}
            value={moment.parseZone(toDo.dueDate)}
            onChange={(value) => { updateTodo({ variables: {id: toDo.id, dueDate: value.toISOString()}}) }}
          />
        )}
      </Mutation>
      <Mutation
        mutation={updateToDoQuery}
        update={(cache, { data: { updateTodo } }) => {
          if (orderBy === 'priority') {
            refetch();
          }
        }}
      >
        {(updateTodo, { data }) => (
          <PriorityInput
            className={'c-toDo__priority'}
            value={toDo.priority}
            onChange={(value) => { updateTodo({ variables: {id: toDo.id, priority: value}}) }}
          />
        )}
      </Mutation>
      <div className={'c-toDo__remove'}>
        <Mutation
          mutation={deleteToDoQuery}
          update={(cache, { data: { deleteTodo } }) => {
            const { getToDos } = cache.readQuery({ query: getToDosQuery, variables: { orderBy } });
            const toDos = [...getToDos]
            toDos.splice(getToDos.findIndex((item: ITodo) => item.id === toDo.id), 1)
            cache.writeQuery({
              query: getToDosQuery,
              variables: { orderBy },
              data: { getToDos: toDos }
            });
          }}
        >
          {(deleteTodo, { data }) => (
            <button className={'c-toDo__removeBtn'} onClick={(e) => { e.preventDefault(); deleteTodo({ variables: {id: toDo.id}}) } }>
              <i className={'c-toDo__removeIcon icon-close'}></i>
            </button>
          )}
        </Mutation>
      </div>
    </li>
  );
}
