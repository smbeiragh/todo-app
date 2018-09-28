import * as React from 'react';
import { shallow } from 'enzyme';
import { ToDoApp } from '../ToDoApp';


test('ToDoApp should render', () => {
  const component = shallow(
    <ToDoApp onSort={()=>{}} orderBy={'title'} />
  );
  expect(component).toMatchSnapshot();
});
