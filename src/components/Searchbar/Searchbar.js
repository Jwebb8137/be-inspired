import React, { Fragment, useEffect, useState } from 'react'
import './Searchbar.css'
import config from '../../config'

const Searchbar = props => {

  const [searchTerm, setSearchTerm] = useState("")
  const [currentSearch, setCurrentSearch] = useState("")
  const [err, setError] = useState("")
  const [activeSearch, setActiveSearch] = useState(false)
  const { API_ENDPOINT } = config;

  const searchPostsSubmit = async (e) => {
    console.log('searching')
    setCurrentSearch(searchTerm)
    e.preventDefault()
    try {
      const response = await fetch(`${API_ENDPOINT}/posts/search?q=${searchTerm}`);
      const jsonData = await response.json();
      console.log(jsonData)
      setMatchingPosts(jsonData)  
      setActiveSearch(true)
    } catch (error) {
        console.error(err.message)
    }
  }

  const setMatchingPosts = posts => {
    props.setSearchedPosts(posts)
  }

  const searchTermHandler = target => {
    setSearchTerm(target)
    console.log(target)
  }

  if (activeSearch) {
    return (
      <Fragment>
        <div id="searchbar-container">
          <form onSubmit={searchPostsSubmit}>
            <label></label>
            <input 
              id="searchbar-input" 
              typeof='text'
              onChange={e => searchTermHandler(e.target.value)}
              placeholder="Search Posts">  
            </input>
            <button id="search-btn" typeof='submit'><i class="fas fa-search"></i></button>
          </form>
          <h3 id="search-results-heading">{`Posts found matching "${currentSearch.toUpperCase()}"`}</h3>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div id="searchbar-container">
        <form onSubmit={searchPostsSubmit}>
          <label></label>
          <input 
            id="searchbar-input" 
            typeof='text' 
            onChange={e => searchTermHandler(e.target.value)}
            placeholder="Search Posts">  
          </input>
          <button id="search-btn" typeof='submit'><i class="fas fa-search"></i></button>
        </form>
      </div>
    </Fragment>
  )
}

export default Searchbar