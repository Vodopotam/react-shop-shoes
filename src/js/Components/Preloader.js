import React from 'react';

class Preloader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="preloader_wrapper">
        <div className="preloader">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      </div>
    );
  }
}

export default Preloader;
