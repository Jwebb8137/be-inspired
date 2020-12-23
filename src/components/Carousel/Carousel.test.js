import "../../../setupTests.test"
import Carousel from "./CarouselSlide"
import React from 'react'
import { shallow } from 'enzyme'

it("renders without crashing", () => {
  shallow(<Carousel />);
});