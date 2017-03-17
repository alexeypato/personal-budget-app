import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { List } from 'immutable';
import { Modal, Dropdown, MenuItem } from 'react-bootstrap';

import { getCategoryList, categorieActions } from '../../reducers/categories';
import { moneysActions } from '../../reducers/moneys';
import { unplannedMoneyActions } from '../../reducers/unplannedMoney';

const DatePicker = require('react-bootstrap-date-picker');
const date = require('date-and-time');

const dayLabels = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
const monthLabels = [
  'Январь', 'Февраль', 'Март', 'Апрель',
  'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

class InputModal extends Component {
  static propTypes = {
    categories: PropTypes.instanceOf(List).isRequired,
    clearState: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    createMoney: PropTypes.func.isRequired,
    showModal: PropTypes.bool,
    updateCategory: PropTypes.func.isRequired,
    updateUnplannedMoney: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      clearState: false,
      date: new Date().toISOString(),
      focused: false,
      idDropdown: -1,
      textError: '',
      titleDropdown: 'Выберите категорию',
      value: '',
    };
  }

  componentWillReceiveProps = () => {
    this.setState({
      clearState: this.props.clearState,
    });
    if (this.props.clearState) {
      this.setState({
        clearState: false,
        date: new Date().toISOString(),
        focused: false,
        idDropdown: -1,
        textError: '',
        titleDropdown: 'Выберите категорию',
        value: '',
      });
    }
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

  saveAndClose = () => {
    const value = Number(this.state.value);

    if (value > 0) {
      const dateOut = date.parse(this.state.date, 'YYYY-MM-DD');
      const idDropdown = this.state.idDropdown;
      this.props.createMoney(date.format(dateOut, 'YYYY-MM-DD'), value);
      if (idDropdown !== -1) {
        this.props.updateCategory(
          idDropdown,
          { moneyCategory: idDropdown.moneyCategory + value },
        );
      } else {
        this.props.updateUnplannedMoney(value);
      }
      this.props.closeModal();
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
        <Modal
          show={this.props.showModal}
          onHide={this.props.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-plus"></span> Внести средства
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
              dateFormat="YYYY-MM-DD"
              dayLabels={dayLabels}
              monthLabels={monthLabels}
              onChange={this.handleOnChangeDate}
              onBlur={() => { this.setState({ focused: false }); }}
              onFocus={() => { this.setState({ focused: true }); }}
              showClearButton={false}
              showTodayButton
              todayButtonLabel={'Сегодня'}
              value={this.state.date}
              weekStartsOnMonday
            />
            <Dropdown
              block
              id="dropdown-categories"
              vertical
            >
              <Dropdown.Toggle block>
                {this.state.titleDropdown}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem
                  onClick={() => {
                    this.setState({
                      idDropdown: -1,
                      titleDropdown: 'Выберите категорию',
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
                        idDropdown: category,
                        titleDropdown: category.nameCategory,
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
              onClick={this.props.closeModal}
              type="button"
            >
              Закрыть
            </button>
            <button
              className="btn btn-primary"
              onClick={this.saveAndClose}
              type="button"
            >
              Внести
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getCategoryList,
  categories => ({
    categories,
  }),
);

const mapDispatchToProps = Object.assign(
  {},
  categorieActions,
  moneysActions,
  unplannedMoneyActions,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputModal);
