import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../auth';

export function LogIn({ signInWithGoogle, signInWithTwitter }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="form-login">
            <div className="row text-center">
              <p>Вход - Личный бютжет</p>
            </div>
            {/* <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center">
                <p><input
                  className="form-control text-center"
                  placeholder="Email"
                  data-toggle="tooltip"
                  title="Email"
                /></p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center">
                <p><input
                  className="form-control text-center"
                  placeholder="Password"
                  data-toggle="tooltip"
                  title="Password"
                /></p>
              </div>
              <div className="col-md-8 col-md-offset-2">
                <div className="col-xs-6">
                  <p><button
                    className="btn btn-primary btn-block"
                    type="button"
                  >
                    <span className="glyphicon glyphicon-log-in"></span> Войти
                  </button></p>
                </div>
                <div className="col-xs-6">
                  <p><button
                    className="btn btn-danger btn-block"
                    type="button"
                  >
                    <span className="glyphicon glyphicon-user"></span> Регистрация
                  </button></p>
                </div>
              </div>
            </div>
            <hr />*/}
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center">
                <p><button
                  className="btn btn-block btn-social btn-google"
                  onClick={signInWithGoogle}
                  type="button"
                >
                  <span className="fa fa-google"></span> Войти с помощью Google
                </button></p>
                <p><button
                  className="btn btn-block btn-social btn-twitter"
                  onClick={signInWithTwitter}
                  type="button"
                >
                  <span className="fa fa-twitter"></span> Войти с помощью Twitter
                </button></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LogIn.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired,
};

export default connect(null, authActions)(LogIn);
