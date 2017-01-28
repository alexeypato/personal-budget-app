import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Button, Modal, Dropdown, MenuItem } from 'react-bootstrap';
import '../assets/stylesheets/main.scss';

const DatePicker = require('react-bootstrap-date-picker');
const date = require('date-and-time');

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      textError: '',
      date: new Date().toISOString(),
      focused: false,
      showModal: false,
      titleDropdown: 'Выберите категорию',
      idDropdown: -1,
    };
  }

  handleOnChangeInput = () => {
    this.setState({
      value: this.cashInput.value.replace(/\D/, ''),
    });
  }

  handleOnChangeDate = (value) => {
    this.setState({
      date: value,
    });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  saveAndClose = () => {
    const value = this.state.value;

    if (value.length > 0) {
      if (value.replace(/\d/g, '').length) {
        this.setState({
          value: '',
          textError: 'Ошибка! Неверная сумма средств.',
        });
      } else {
        const dateOut = date.parse(this.state.date, 'YYYY-MM-DD');
        const idDropdown = this.state.idDropdown;
        this.props.onAddMoney(this.props.money.length,
          value, date.format(dateOut, 'YYYY-MM-DD'));
        if (idDropdown !== -1) {
          this.props.onEditCategories(idDropdown, value, value);
        }
        this.setState({
          value: '',
          textError: '',
          date: new Date().toISOString(),
          titleDropdown: 'Выберите категорию',
          idDropdown: -1,
        });
        this.closeModal();
      }
    } else {
      this.setState({ textError: 'Ошибка! Введите сумму средств.' });
    }
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState({ showModal: true })}
          bsStyle="primary"
          className="btn-block"
        >
          <span className="glyphicon glyphicon-plus"> Внести средства</span>
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}
          bsSize="small"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-plus"> Внести средства</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="form-control text-center margin-bottom"
              onChange={() => this.handleOnChangeInput()}
              placeholder={
                this.state.textError ?
                  this.state.textError :
                  'Сумма средств'
              }
              value={this.state.value}
              maxLength="10"
              ref={(input) => { this.cashInput = input; }}
            />
            <DatePicker
              className="text-center margin-bottom"
              onChange={this.handleOnChangeDate}
              value={this.state.date}
              onFocus={() => { this.setState({ focused: true }); }}
              onBlur={() => { this.setState({ focused: false }); }}
              dateFormat="YYYY-MM-DD"
              showClearButton={false}
            />
            <Dropdown
              vertical
              block
              id="dropdown-categories"
            >
              <Dropdown.Toggle block>
                {this.state.titleDropdown}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem
                  onClick={() => {
                    this.setState({
                      titleDropdown: 'Выберите категорию',
                      idDropdown: -1,
                    });
                  }}
                >
                  Выберите категорию
                </MenuItem>
                <MenuItem divider />
                {this.props.categories.map((category, index) =>
                  <MenuItem
                    key={index}
                    onClick={() => {
                      this.setState({
                        titleDropdown: category.nameCategory,
                        idDropdown: category.id,
                      });
                    }}
                  >
                    {category.nameCategory}</MenuItem>,
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>
              Закрыть
            </Button>
            <Button bsStyle="primary" onClick={this.saveAndClose}>
              Внести
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    money: state.money,
    categories: state.categories,
    ownProps,
  }),
  dispatch => ({
    onAddMoney: (id, addMoney, addDate) => {
      const payload = {
        id: id + 1,
        money: addMoney,
        date: addDate,
      };
      dispatch({ type: 'ADD_MONEY', payload });
      dispatch({ type: 'ADD_UNPLANNED_MONEY', addMoney });
    },
    onEditCategories: (id, moneyPlanned, cashCategory) => {
      dispatch({ type: 'ADD_MONEY_CATEGORY', id, moneyPlanned });
      dispatch({ type: 'DELETE_UNPLANNED_MONEY', cashCategory });
    },
  }),
)(Input);
