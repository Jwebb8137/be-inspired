import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './CarouselSlide.css';
import Image1 from '../../images/video.mp4';
import Image2 from '../../images/video2.mp4';
import Image3 from '../../images/video3.mp4';
import Image4 from '../../images/video4.mp4';

export default class CarouselSlider extends React.Component {
  render() {
    return (
      <CarouselProvider
        id="main-carousel"
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        isPlaying={true}
        totalSlides={4}
        interval={6000}
        visibleSlides={3}
      >
        <Slider id="main-slider">
          <Slide index={0}>
            <video controls autoPlay loop muted>
              <source src={Image1} type="video/mp4" />
              <source src={Image1} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </Slide>
          <Slide index={1}>
            <video controls autoPlay loop muted>
              <source src={Image2} type="video/mp4" />
              <source src={Image2} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </Slide>
          <Slide index={2}>
            <video controls autoPlay loop muted>
              <source src={Image3} type="video/mp4" />
              <source src={Image3} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </Slide>
          <Slide index={3}>
            <video controls autoPlay loop muted>
              <source src={Image4} type="video/mp4" />
              <source src={Image4} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </Slide>
        </Slider>
      </CarouselProvider>
    );
  }
}