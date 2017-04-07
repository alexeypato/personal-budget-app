import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../reducers/auth';
import { paths } from '../constants';

class SignUp extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };
  static propTypes = {
    signUp: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      textErrorEmail: '',
      textErrorPassword: '',
      textErrorConfirmPassword: '',
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

  handleOnChangeConfirmPassword = () => {
    this.setState({
      confirmPassword: this.inputConfirmPassword.value,
    });
  }

  signUp = () => {
    document.getElementById('sign-up').blur();
    const trueEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
    this.setState({
      textErrorEmail: '',
      textErrorPassword: '',
    });
    const email = this.state.email;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
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

    if (password.length < 6 || confirmPassword !== password) {
      this.setState({
        confirmPassword: '',
        textErrorConfirmPassword: 'Ошибка! Неверный пароль.',
      });
      flag = true;
    }

    if (!flag) {
      this.props.signUp(this.state.email, this.state.password);
    }
  }

  runScript = (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      this.signUp();
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="form-login">
              <div className="row text-center">
                <p>Регистрация - Личный бютжет</p>
              </div>
              <div className="row">
                <div className="col-md-8 col-md-offset-2 text-center">
                  <p><input
                    className="form-control text-center"
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
                    maxLength="15"
                    onChange={() => this.handleOnChangePassword()}
                    onKeyPress={e => this.runScript(e)}
                    placeholder={this.state.textErrorPassword || 'Password'}
                    ref={(input) => { this.inputPassword = input; }}
                    type="password"
                    value={this.state.password}
                  /></p>
                </div>
                <div className="col-md-8 col-md-offset-2 text-center">
                  <p><input
                    className="form-control text-center"
                    maxLength="15"
                    onChange={() => this.handleOnChangeConfirmPassword()}
                    onKeyPress={e => this.runScript(e)}
                    placeholder={this.state.textErrorConfirmPassword || 'Confirm password'}
                    ref={(input) => { this.inputConfirmPassword = input; }}
                    type="password"
                    value={this.state.confirmPassword}
                  /></p>
                </div>
                <div className="col-md-8 col-md-offset-2">
                  <div className="col-xs-6" style={{ padding: '0px 5px' }}>
                    <p><button
                      className="btn btn-danger btn-block"
                      id="sign-up"
                      onClick={this.signUp}
                      type="button"
                    >
                      <span className="glyphicon glyphicon-user"></span>{' Регистрация'}
                    </button></p>
                  </div>
                  <div className="col-xs-6" style={{ padding: '0px 5px' }}>
                    <p><button
                      className="btn btn-primary btn-block"
                      onClick={() => { this.context.router.replace(paths.SIGN_IN); }}
                      type="button"
                    >
                      <span className="glyphicon glyphicon-log-in"></span>{' Назад'}
                    </button></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, authActions)(SignUp);
