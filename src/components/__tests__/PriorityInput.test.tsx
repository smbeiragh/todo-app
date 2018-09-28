import * as React from 'react';
import { PriorityInput } from '../PriorityInput';
import * as renderer from 'react-test-renderer';
import {shallow} from "enzyme";

describe('PriorityInput', () => {
  it('click on buttons should trigger onChange', () => {
    const clickFn = jest.fn();
    const component = shallow(<PriorityInput onChange={clickFn} value={1} />);
    component
      .find('.c-priorityInput__btn--up')
      .simulate('click', {
        preventDefault: () => {
        }
      });
    expect(clickFn).toHaveBeenCalled();
  });

  it('PriorityInput should render', () => {
    const component = renderer.create(
      <PriorityInput value={1} onChange={()=>{}} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
