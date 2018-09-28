import * as React from 'react';
import { ToDoAppContainer } from './ToDoAppContainer';

export function App(props: any) {
  return (
    <div className={'c-app'}>
      <div className={'c-app__wrap'}>
        <ToDoAppContainer/>
      </div>
    </div>
  );
}
