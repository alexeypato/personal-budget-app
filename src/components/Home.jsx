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
            <div className="col-md-8 col-md-offset-2">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
