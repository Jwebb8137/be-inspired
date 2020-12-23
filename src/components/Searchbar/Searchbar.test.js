import "../../../setupTests.test"
import Searchbar from "./Searchbar"
import React from 'react'
import { shallow } from 'enzyme'

it("renders without crashing", () => {
  shallow(<Searchbar />);
});