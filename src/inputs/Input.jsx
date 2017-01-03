import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/stylesheets/input.scss';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      textError: '',
    };
  }

  handleOnChangeInput = () => {
    this.setState({
      value: ReactDOM.findDOMNode(this.refs.cash).value.replace(/\D/, ''),
    });
  };

  handleAddCash = () => {
    if (this.state.value.length > 0) {
      if (this.state.value.replace(/\d/g, '').length) {
        this.setState({ value: '' });
        this.setState({ textError: 'Error! Invalid sum of money.' });
      } else {
        this.props.addCash(this.state.value);
        this.setState({ value: '' });
        this.setState({ textError: '' });
      }
    } else {
      this.setState({ textError: 'Error! Enter sum of money.' });
    }
  };

  render() {
    return (
      <div>
        <input
          onChange={() => this.handleOnChangeInput()}
          placeholder="Sum of money"
          value={this.state.value}
          ref="cash"
        />
        <a
          onClick={() => this.handleAddCash()}
          className="add-btn"
          href={undefined}
          tabIndex={0}
        >
        Place
        </a>
        <p>{this.state.textError}</p>
      </div>
    );
  }
}
