import React from 'react'

export default React.createContext({
  users: [],
  posts: [],
  addUser: () => {},
  deleteUser: () => {},
  addPost: () => {},
  deletePost: () => {},
})