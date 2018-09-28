import * as React from 'react';
import { ToDo } from './ToDo';

type Props = {
  toDos: ITodo[]
  refetch: () => void
  orderBy: string
};

export function ToDoList({ toDos, refetch, orderBy }: Props) {
 return (
   <ul className={'c-toDoList'}>
     { toDos.map((todo: any) => (
       <ToDo className={'c-toDoList__item'} key={todo.id} toDo={todo} refetch={refetch} orderBy={orderBy} />
     ))}
   </ul>
 );
}
