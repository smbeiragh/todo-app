import * as React from 'react';
import { ToDoSort } from '../ToDoSort';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';


describe('ToDoSort', () => {
  it('click on sort buttons should trigger onChange', () => {
    const clickFn = jest.fn();
    const component = shallow(<ToDoSort onChange={clickFn} />);
    component
      .find('button.c-toDoSort__btn')
      .at(0)
      .simulate('click', {
        preventDefault: () => {
        }
      });
    expect(clickFn).toHaveBeenCalled();
  });

  it('ToDoSort should render', () => {
    const component = renderer.create(
     <ToDoSort />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
