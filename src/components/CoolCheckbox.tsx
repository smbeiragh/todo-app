import * as React from 'react';
import classnames from 'classnames';

type Props = {
  onChange: (value: boolean) => void
  checked: boolean
  className: string
}

type DefaultProps = {
  onChange: (value: boolean) => void
  checked: boolean
  className: string
}

export class CoolCheckbox extends React.Component<Props> {

  static defaultProps: DefaultProps = {
    onChange: () => {},
    checked: false,
    className: ''
  }

  constructor(props: Props) {
    super(props)
  }

  handleChange(checked: boolean) {
    this.props.onChange(checked);
  }

  render() {
    const { className, checked} = this.props;
    return (
      <label className={classnames(className, 'c-coolCheckBox')}>
        <input
          className={'c-coolCheckBox__input'}
          type="checkbox"
          checked={checked}
          onChange={(e) => { this.handleChange(e.target.checked) }}
        />
        <i className={'c-coolCheckBox__check icon-done'} />
      </label>
    );
  }
}
