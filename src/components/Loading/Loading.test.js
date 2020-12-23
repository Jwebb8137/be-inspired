import "../../../setupTests.test"
import Loading from "./Loading"
import React from 'react'
import { shallow } from 'enzyme'

it("renders without crashing", () => {
  shallow(<Loading />);
});