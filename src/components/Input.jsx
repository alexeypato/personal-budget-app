import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Modal, Dropdown, MenuItem } from 'react-bootstrap';
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

    if (value.length > 0 && Number(value) !== 0) {
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
      this.setState({
        textError: 'Ошибка! Введите сумму средств.',
        value: '',
      });
    }
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-block"
          type="button"
          onClick={() => this.setState({ showModal: true })}
        >
          <span className="glyphicon glyphicon-plus"> Внести средства</span>
        </button>

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
              data-toggle="tooltip"
              title="Сумма средств"
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
            <button
              className="btn btn-default"
              type="button"
              onClick={this.closeModal}
            >
              Закрыть
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.saveAndClose}
            >
              Внести
            </button>
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
    onAddMoney: (id, deposit, addDate) => {
      const newDeposit = {
        id: id + 1,
        money: deposit,
        date: addDate,
      };
      dispatch({ type: 'ADD_MONEY', newDeposit });
      dispatch({ type: 'ADD_UNPLANNED_MONEY', deposit });
    },
    onEditCategories: (id, moneyCategory, withdrawal) => {
      dispatch({ type: 'ADD_MONEY_TO_CATEGORY', id, moneyCategory });
      dispatch({ type: 'DELETE_UNPLANNED_MONEY', withdrawal });
    },
  }),
)(Input);
