import * as React from 'react';
import { App } from '../App';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';


test('App should render', () => {
  const component = shallow(
    <App />
  );
  expect(component).toMatchSnapshot();
});
