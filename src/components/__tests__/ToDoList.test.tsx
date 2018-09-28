import * as React from 'react';
import { shallow } from 'enzyme';
import { ToDoList } from '../ToDoList';
import {FakeDB} from './../../gql/mockDB';
import { creatData } from '../../../__mocks__/db-data';

test('ToDo should render', () => {
  const db = new FakeDB(creatData());
  const toDos = db.getToDos();
  const component = shallow(
    <ToDoList toDos={toDos} refetch={()=>{}} orderBy={'title'}/>
  );
  expect(component).toMatchSnapshot();
});
