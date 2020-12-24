import "../../../setupTests.test"
import Sidebar from "./Sidebar"
import React from 'react'
import { shallow } from 'enzyme'

it("renders without crashing", () => {
  shallow(<Sidebar />)
})