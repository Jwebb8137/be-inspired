import "../../../setupTests.test"
import Profile from "./Profile"
import React from 'react'
import { shallow } from 'enzyme'

it("renders without crashing", () => {
  shallow(<Profile />)
})