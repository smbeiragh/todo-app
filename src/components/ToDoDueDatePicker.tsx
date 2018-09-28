import * as React from 'react';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Moment} from "moment";
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  value: Moment
  onChange: (value: Moment) => void
  className: string
}

type DefaultProps = {
  value: Moment
  onChange: (value: Moment) => void
  className: string
}

export class ToDoDueDatePicker extends React.Component<Props> {

  static defaultProps: DefaultProps = {
    value: moment(),
    onChange: (value: Moment) => {},
    className: ''
  }

  constructor(props: Props) {
    super(props)
  }

  render(){
    const { value, onChange, className } = this.props;
    return (
      <div className={classnames(className, 'c-toDoDueDatePicker')}>
        <DatePicker className={'c-toDoDueDatePicker__input'} selected={value} onChange={onChange} />
      </div>
    );
  }
}