import * as React from 'react';
import { ToDoAddForm } from '../ToDoAddForm';
import * as renderer from 'react-test-renderer';

test('ToDoAddForm should render', () => {
  const component = renderer.create(
    <ToDoAddForm />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
