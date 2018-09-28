import * as React from 'react';
import { ToDoDueDatePicker } from '../ToDoDueDatePicker';
import * as renderer from 'react-test-renderer';

test('ToDoDueDatePicker should render', () => {
  const component = renderer.create(
    <ToDoDueDatePicker />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
