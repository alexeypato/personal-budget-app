import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { Modal } from 'react-bootstrap';

import { categoriesActions } from '../../reducers/categories';
import { unplannedMoneyActions } from '../../reducers/unplannedMoney';

class CategoryModal extends Component {
  static propTypes = {
    categories: PropTypes.instanceOf(List).isRequired,
    category: PropTypes.object.isRequired,
    closeCategoryModal: PropTypes.func.isRequired,
    createCategory: PropTypes.func.isRequired,
    isDeleteCategory: PropTypes.bool.isRequired,
    isEditCategory: PropTypes.bool.isRequired,
    showCategoryModal: PropTypes.bool,
    updateCategory: PropTypes.func.isRequired,
    updateUnplannedMoney: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      nameCategory: '',
      progress: '',
      textErrorName: '',
      textErrorProgress: '',
    };
  }

  componentDidMount = () => {
    this.setState({
      nameCategory: this.props.category.nameCategory,
      textErrorProgress: this.props.category.progress || '',
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isEditCategory) {
      this.setState({
        nameCategory: nextProps.category.nameCategory,
        progress: '',
        textErrorName: '',
        textErrorProgress: nextProps.category.progress,
      });
    } else {
      this.setState({
        nameCategory: '',
        progress: '',
        textErrorName: '',
        textErrorProgress: '',
      });
    }
  }

  handleOnChangeInput = () => {
    this.setState({
      nameCategory: this.nameCategoryInput.value,
    });
  }

  handleOnChangeProgress = () => {
    this.setState({
      progress: this.progressInput.value.replace(/\D/, ''),
    });
  }

  saveAndClose = () => {
    const nameCategory = this.state.nameCategory.trim();
    const progress = this.state.progress;
    if (nameCategory.length > 0) {
      let duplicate = false;
      const categories = this.props.categories._tail !== undefined
        ? this.props.categories._tail.array
        : [];

      if (this.props.isEditCategory) {
        for (let i = 0; i < categories.length; i += 1) {
          if (
            categories[i].nameCategory === nameCategory
            && categories[i].key !== this.props.category.key
          ) {
            duplicate = true;
          }
        }

        if (!duplicate) {
          if (progress > 1) {
            this.props.updateCategory(
              this.props.category,
              { nameCategory, progress },
            );
            this.props.closeCategoryModal();
          } else {
            this.setState({
              progress: '',
              textErrorProgress: 'Ошибка! Введите целевую сумму.',
            });
          }
        } else {
          this.setState({
            nameCategory: '',
            textErrorName: 'Ошибка! Такая категория уже есть.',
          });
        }
      } else {
        for (let i = 0; i < categories.length; i += 1) {
          if (categories[i].nameCategory === nameCategory) {
            duplicate = true;
          }
        }

        if (!duplicate) {
          if (progress > 1) {
            this.props.createCategory(0, nameCategory, progress);
            this.props.closeCategoryModal();
          } else {
            this.setState({
              progress: '',
              textErrorProgress: 'Ошибка! Введите целевую сумму.',
            });
          }
        } else {
          this.setState({
            nameCategory: '',
            textErrorName: 'Ошибка! Такая категория уже есть.',
          });
        }
      }
    } else {
      this.setState({
        nameCategory: '',
        textErrorName: 'Ошибка! Введите название категории.',
      });
    }
  }

  deleteAndClose = () => {
    this.props.deleteCategory(this.props.category);
    this.props.updateUnplannedMoney(this.props.category.moneyCategory);
    this.props.closeCategoryModal();
  }

  runScript = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      this.saveAndClose();
      return false;
    }
    return true;
  }

  choiseAction = () => {
    if (this.props.isDeleteCategory) {
      return (
        <div>
          <Modal
            show={this.props.showCategoryModal}
            onHide={this.props.closeCategoryModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <span className="glyphicon glyphicon-trash"></span>{' Удалить категорию'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ wordBreak: 'break-all' }}>
              <p>
                {
              `Вы действительно хотите удалить категорию: "${this.props.category.nameCategory}" ?`
                }
              </p>
            </Modal.Body>
            <Modal.Footer>
              <button
                autoFocus
                className="btn btn-default"
                onClick={this.props.closeCategoryModal}
                type="button"
              >
                Закрыть
              </button>
              <button
                className="btn btn-danger"
                onClick={this.deleteAndClose}
                type="button"
              >
                Удалить
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
    return (
      <div>
        <Modal
          show={this.props.showCategoryModal}
          onHide={this.props.closeCategoryModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.isEditCategory
                ? <div>
                  <span className="glyphicon glyphicon-pencil"></span>{' Редактировать категорию'}
                </div>
                : <div>
                  <span className="glyphicon glyphicon-plus"></span>{' Добавить категорию'}
                </div>
              }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              autoFocus
              className="form-control text-center"
              onChange={() => this.handleOnChangeInput()}
              onKeyPress={e => this.runScript(e)}
              placeholder={
                this.state.textErrorName ?
                  this.state.textErrorName :
                  'Введите название категории'
              }
              ref={(input) => { this.nameCategoryInput = input; }}
              value={this.state.nameCategory}
            />
            <input
              className="form-control text-center margin-top"
              maxLength="10"
              onChange={() => this.handleOnChangeProgress()}
              onKeyPress={e => this.runScript(e)}
              placeholder={
                this.state.textErrorProgress ?
                  this.state.textErrorProgress :
                  'Введите целевую сумму'
              }
              ref={(input) => { this.progressInput = input; }}
              value={this.state.progress}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              onClick={this.props.closeCategoryModal}
              type="button"
            >
              Закрыть
            </button>
            <button
              className="btn btn-primary"
              onClick={this.saveAndClose}
              type="button"
            >
              Сохранить
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  render() {
    return this.choiseAction();
  }
}

const mapDispatchToProps = Object.assign(
  {},
  categoriesActions,
  unplannedMoneyActions,
);

export default connect(
  null,
  mapDispatchToProps,
)(CategoryModal);
