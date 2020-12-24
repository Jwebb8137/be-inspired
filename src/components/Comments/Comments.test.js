import "../../../setupTests.test"
import Comments from "./Comments"
import React from 'react'
import { shallow } from 'enzyme'

it("renders without crashing", () => {
  shallow(<Comments />)
})