import * as React from 'react';
import { shallow } from 'enzyme';
import { ToDo } from '../ToDo';


test('ToDo should render', () => {
  const toDo =  {
    id: '45341534323',
    title: 'Todo 1',
    priority: 2,
    dueDate: '2018-09-27T10:53:48.248Z',
    done: false
  };
  const component = shallow(
    <ToDo orderBy={'title'} className="testClass" refetch={() => {}} toDo={toDo} />
  );
  expect(component).toMatchSnapshot();
});
