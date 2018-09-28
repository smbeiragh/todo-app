import * as React from 'react';
import classnames from 'classnames';

const priorityNames = ['low', 'medium', 'high'];

type Props = {
  onChange: (value: number) => void,
  value: number,
  min: number,
  max: number,
  className: string
}

type DefaultProps = {
  onChange: (value: number) => void,
  value: number,
  min: number,
  max: number,
  className: string
}

export class PriorityInput extends React.Component<Props> {

  static defaultProps: DefaultProps = {
    onChange: ()=>{},
    value: 1,
    min: 0,
    max: 2,
    className: ''
  }

  constructor(props: Props) {
    super(props);
  }

  handleChange(delta: number) {
    const { value, onChange, min, max } = this.props;
    const newValue = value + delta;
    if(newValue <= max && newValue >= min) {
      onChange(newValue)
    }
  }

  render() {
    const { value, className, min, max } = this.props;
    return (
      <div className={classnames(className, 'c-priorityInput')}>
        <button
          className={'c-priorityInput__btn c-priorityInput__btn--up'}
          onClick={(e) => { e.preventDefault(); this.handleChange(1); }}
          disabled={value === max}
        >
          <i className={'c-priorityInput__icon icon-less'}></i>
        </button>
        <div className={'c-priorityInput__display'} >{ priorityNames[value] }</div>
        <button
          className={'c-priorityInput__btn c-priorityInput__btn--down'}
          onClick={(e) => { e.preventDefault(); this.handleChange(-1);}}
          disabled={value === min}
        >
          <i className={'c-priorityInput__icon icon-more'}></i>
        </button>
      </div>
    );
  }
}