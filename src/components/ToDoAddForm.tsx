import * as React from 'react';
import classnames from 'classnames';

type Props = {
  onSubmit: (e: any) => void
  className: string
}

type DefaultProps = {
  onSubmit: (e: any) => void
  className: string
}

export class ToDoAddForm extends React.Component<Props> {

  static defaultProps: DefaultProps = {
    className: '',
    onSubmit: ()=>{}
  }

  constructor(props: Props) {
    super(props);
    this.state = { isInvalid: false, value: '' };
  }

  handelChange(newValue: string){
    this.setState({
      isInvalid: false,
      value: newValue
    });
  }

  handleSubmit() {
    this.validate(() => {
      const { value, isInvalid } = this.state as any;
      const { onSubmit } = this.props as any;
      if(!isInvalid) {
        onSubmit({value})
        this.setState({ isInvalid: false, value: '' });
      }
    });
  }

  validate(cb: any) {
    const { value } = this.state as any;
    if (value && value.trim()) {
      this.setState({ isInvalid: false }, cb);
    } else {
      this.setState({ isInvalid: true }, cb);
    }
  }

  render() {
    const { value, isInvalid } = this.state as any;
    return (
      <div className={classnames(this.props.className, 'c-toDoAddForm', {['is-invalid']: isInvalid})} >
        <form onSubmit={(e) => { e.preventDefault(); this.handleSubmit() }}>
          <input
            placeholder="Enter Todo Name and press Enter"
            className="c-toDoAddForm__input"
            type="text"
            maxLength={300}
            value={value}
            onChange={(e)=> this.handelChange(e.target.value) }
          />
        </form>
      </div>
    );
  }
}
