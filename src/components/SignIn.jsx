import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../reducers/auth';
import { paths } from '../constants';
import ResetPasswordModal from './modal/ResetPasswordModal';

class SignIn extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  static propTypes = {
    resetPassword: PropTypes.func.isRequired,
    signInWithGoogle: PropTypes.func.isRequired,
    signInWithFacebook: PropTypes.func.isRequired,
    signInWithTwitter: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      ResetPasswordModal: false,
      textErrorEmail: '',
      textErrorPassword: '',
    };
  }

  handleOnChangeEmail = () => {
    this.setState({
      email: this.inputEmail.value,
    });
  }

  handleOnChangePassword = () => {
    this.setState({
      password: this.inputPassword.value,
    });
  }

  signIn = () => {
    document.getElementById('sign-in').blur();
    const trueEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
    this.setState({
      textErrorEmail: '',
      textErrorPassword: '',
    });
    const email = this.state.email;
    const password = this.state.password;
    let flag = false;
    if (!trueEmail.test(email)) {
      this.setState({
        email: '',
        textErrorEmail: 'Ошибка! Введите email.',
      });
      flag = true;
    }
    if (password.length < 6) {
      this.setState({
        password: '',
        textErrorPassword: 'Ошибка! Введите пароль.',
      });
      flag = true;
    }
    if (!flag) {
      this.props.signIn(email, password);
    }
  }

  showResetPasswordModal = () => {
    document.getElementById('reset-password').blur();
    this.setState({
      ResetPasswordModal: true,
    });
  }

  closeResetPasswordModal = () => {
    this.setState({
      ResetPasswordModal: false,
    });
  }

  runScript = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      this.signIn();
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="form-login">
              <div className="row text-center">
                <p>Вход - Личный бютжет</p>
              </div>
              <div className="row">
                <div className="col-md-8 col-md-offset-2 text-center">
                  <p><input
                    className="form-control text-center"
                    id="input-email"
                    onChange={() => this.handleOnChangeEmail()}
                    onKeyPress={e => this.runScript(e)}
                    placeholder={this.state.textErrorEmail || 'Email'}
                    ref={(input) => { this.inputEmail = input; }}
                    value={this.state.email}
                  /></p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 col-md-offset-2 text-center">
                  <p><input
                    className="form-control text-center"
                    id="input-password"
                    maxLength="15"
                    onChange={() => this.handleOnChangePassword()}
                    onKeyPress={e => this.runScript(e)}
                    placeholder={this.state.textErrorPassword || 'Password'}
                    ref={(input) => { this.inputPassword = input; }}
                    type="password"
                    value={this.state.password}
                  /></p>
                </div>
                <div className="col-md-8 col-md-offset-2 text-right">
                  <a
                    className="nav-item"
                    id="reset-password"
                    onClick={this.showResetPasswordModal}
                    tabIndex={0}
                  >
                    Восстановить пароль?
                  </a>
                  <p></p>
                  <ResetPasswordModal
                    closeModal={this.closeResetPasswordModal}
                    resetPassword={this.props.resetPassword}
                    showModal={this.state.ResetPasswordModal}
                  />
                </div>
                <div className="col-md-8 col-md-offset-2">
                  <div className="col-xs-6">
                    <p><button
                      className="btn btn-primary btn-block"
                      id="sign-in"
                      onClick={this.signIn}
                      type="button"
                    >
                      <span className="glyphicon glyphicon-log-in"></span>{' Войти'}
                    </button></p>
                  </div>
                  <div className="col-xs-6">
                    <p><button
                      className="btn btn-danger btn-block"
                      onClick={() => this.context.router.replace(paths.SIGN_UP)}
                      type="button"
                    >
                      <span className="glyphicon glyphicon-user"></span>{' Регистрация'}
                    </button></p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-8 col-md-offset-2 text-center">
                  <p><button
                    className="btn btn-block btn-social btn-google"
                    onClick={this.props.signInWithGoogle}
                    type="button"
                  >
                    <span className="fa fa-google"></span>{' Войти с помощью Google'}
                  </button></p>
                  <p><button
                    className="btn btn-block btn-social btn-facebook"
                    onClick={this.props.signInWithFacebook}
                    type="button"
                  >
                    <span className="fa fa-facebook"></span>{' Войти с помощью Facebook'}
                  </button></p>
                  <p><button
                    className="btn btn-block btn-social btn-twitter"
                    onClick={this.props.signInWithTwitter}
                    type="button"
                  >
                    <span className="fa fa-twitter"></span>{' Войти с помощью Twitter'}
                  </button></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, authActions)(SignIn);
