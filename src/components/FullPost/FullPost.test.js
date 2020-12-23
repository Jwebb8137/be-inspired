import "../../../setupTests.test"
import FullPost from "./FullPost"
import React from 'react'
import { shallow } from 'enzyme'

it("renders without crashing", () => {
  shallow(<FullPost />);
});