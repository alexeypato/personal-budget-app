import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer>
        <hr></hr>
        <div className="container text-right">
          Aliaksei Patotski &copy; 2017.
          &nbsp;
          <a
            href="https://www.linkedin.com/in/alexeypato/"
            style={{ color: 'steelblue' }}
          >
            LinkedID
          </a>
          &nbsp;
          <a
            href={'https://jobs.tut.by/applicant/resumes/view?resume=' +
              'b06f8d0dff031b92590039ed1f525a56446431'}
            style={{ color: 'indianred' }}
          >
            TUT.by
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
