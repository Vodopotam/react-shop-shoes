import React from 'react';
import AboutUs from '../../js/Components/AboutUs.js';
import SalesAndNews from '../../js/Components/SalesAndNews.js';
import Slider from '../../js/Components/Slider.js';
import Featured from '../../js/Components/Featured.js';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Slider />
        <Featured {...this.props} />
        <SalesAndNews />
        <AboutUs />
      </div>
    );
  }
}

export default MainPage;
