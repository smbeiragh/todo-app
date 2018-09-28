import * as React from 'react';
import classnames from 'classnames';

type Props = {
  onChange: (value: string) => void
  value: string
  className: string
}

type DefaultProps = {
  onChange: (value: string) => void
  value: string
  className: string
}

export class ToDoSort extends React.Component<Props> {

  static defaultProps: DefaultProps = {
    onChange: () => {},
    value: '',
    className: ''
  }

  constructor(props: Props) {
    super(props)
  }

  handleChange(value: string) {
    if (this.props.value === value) {
      this.props.onChange('');
    } else {
      this.props.onChange(value);
    }
  }

  render() {
    const { className, value } = this.props;
    return (
      <div className={classnames(className, 'c-toDoSort')}>
        <div className="c-toDoSort__label">Sort By</div>
        <button
          className={classnames('c-toDoSort__btn', {['is-active']: value === 'title'})}
          onClick={ (e) => { e.preventDefault(); this.handleChange('title'); } }
        >
          Name
        </button>
        <button
          className={classnames('c-toDoSort__btn', {['is-active']: value === 'dueDate'})}
          onClick={ (e) => { e.preventDefault(); this.handleChange('dueDate'); } }
        >
          Due Date
        </button>
        <button
          className={classnames('c-toDoSort__btn', {['is-active']: value === 'priority'})}
          onClick={ (e) => { e.preventDefault(); this.handleChange('priority'); } }
        >
          Priority
        </button>
      </div>
    );
  }
}
