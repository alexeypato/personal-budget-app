import React from 'react';
import { Button } from 'react-bootstrap';

export default class CustomControl extends React.Component {

  render() {
    const {
      value,
      placeholder,
      ...rest
    } = this.props;

    return <Button {...rest}>{value || placeholder}</Button>;
  }
}
