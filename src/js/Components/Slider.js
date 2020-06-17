import React from 'react';
import slide from '../../img/slider.jpg';
import slide180deg from '../../img/slider180deg.jpeg';
import { slider, sliderStop } from '../../js/slider';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.references = {
      slider: null,
      sliderImages: [],
      sliderCircles: [],
      sliderArrows: [],
    };

    this.setRef = {
      slider: node => (this.references.slider = node),
      sliderImage: node => this.references.sliderImages.push(node),
      sliderCircle: node => this.references.sliderCircles.push(node),
      sliderArrow: node => this.references.sliderArrows.push(node),
    };
  }

  componentDidMount() {
    var f = this.references.slider,
      a = this.references.sliderImages,
      button = this.references.sliderCircles,
      arrows = this.references.sliderArrows;
    slider(f, a, button, '4000', '1000', arrows);
  }

  componentWillUnmount() {
    sliderStop();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <section className="slider">
        <div className="wrapper">
          <div className="slider__pictures" ref={this.setRef.slider}>
            <a className="slider__image" ref={this.setRef.sliderImage}>
              <img src={slide} alt="slide picture" />
            </a>
            <a className="slider__image" ref={this.setRef.sliderImage}>
              <img src={slide180deg} alt="slide picture" />
            </a>
            <a className="slider__image" ref={this.setRef.sliderImage}>
              <img src={slide} alt="slide picture" />
            </a>
            <a className="slider__image" ref={this.setRef.sliderImage}>
              <img src={slide180deg} alt="slide picture" />
            </a>
            <div
              className="arrow slider__arrow slider__arrow_left"
              ref={this.setRef.sliderArrow}
            />
            <div
              className="arrow slider__arrow slider__arrow_right"
              ref={this.setRef.sliderArrow}
            />

            <div className="slider__circles">
              <button
                className="slider__circle"
                value="0"
                ref={this.setRef.sliderCircle}
              />
              <button
                className="slider__circle"
                value="1"
                ref={this.setRef.sliderCircle}
              />
              <button
                className="slider__circle"
                value="2"
                ref={this.setRef.sliderCircle}
              />
              <button
                className="slider__circle"
                value="3"
                ref={this.setRef.sliderCircle}
              />
            </div>
            <h2 className="h2">К весне готовы!</h2>
          </div>
        </div>
      </section>
    );
  }
}

export default Slider;
