import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

class ClearHistory extends Component {
  static propTypes = {
    onClearState: PropTypes.func.isRequired,
    showModal: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
  }

  clearAndClose = () => {
    this.props.onClearState();
    this.props.closeModal();
  };

  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="glyphicon glyphicon-trash"></span> Очистить все
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Вы действительно хотите очистить всю историю?</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              type="button"
              onClick={this.props.closeModal}
            >
              Закрыть
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.clearAndClose}
            >
              Очистить
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    onClearState: () => {
      dispatch({ type: 'CLEAR_MONEY' });
      dispatch({ type: 'CLEAR_CATEGORY' });
      dispatch({ type: 'CLEAR_EXPENSE' });
      dispatch({ type: 'CLEAR_UNPLANNED_MONEY' });
    },
  }),
)(ClearHistory);
