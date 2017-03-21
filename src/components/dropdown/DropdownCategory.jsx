import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-dropdown';

require('react-dropdown/style.css');

class DropdownCategory extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    options: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: { value: '0', label: '' },
      selectedKey: '0',
    };
  }

  componentDidMount = () => {
    this.setState({
      selected: this.props.options[0],
    });
  }

  componentWillReceiveProps = (nextProps) => {
    let isSelect = false;
    nextProps.options.map((selected, index) => {
      if (selected.value === this.state.selectedKey) {
        isSelect = true;
        this.setState({
          selected: nextProps.options[index],
        });
      }
      return 0;
    });
    if (!isSelect) {
      this.setState({
        selected: nextProps.options[0],
      });
    }
  }

  onSelect = (option) => {
    this.setState({ selected: option, selectedKey: option.value });
  }

  render() {
    return (
      <div>
        <Dropdown
          disabled={this.props.disabled}
          options={this.props.options}
          onChange={this.onSelect}
          value={this.state.selected}
          placeholder={this.state.selected.label}
        />
      </div>
    );
  }
}

export default DropdownCategory;
