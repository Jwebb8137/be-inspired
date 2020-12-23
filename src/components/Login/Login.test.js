import "../../../setupTests.test"
import Login from "./Login"
import React from 'react'
import { shallow } from 'enzyme'

it("renders without crashing", () => {
  shallow(<Login />);
});