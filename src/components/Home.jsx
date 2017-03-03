import React, { Component, PropTypes } from 'react';

class Home extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="intro-header">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
