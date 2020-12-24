import React, { Fragment, useEffect, useState } from 'react'
import './Searchbar.css'
import config from '../../config'

const Searchbar = props => {

  const [searchTerm, setSearchTerm] = useState("")
  const [currentSearch, setCurrentSearch] = useState("")
  const [err, setError] = useState("")
  const [activeSearch, setActiveSearch] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const { API_ENDPOINT } = config

  const searchPostsSubmit = async (e) => {
    setIsSearching(true)
    setCurrentSearch(searchTerm)
    e.preventDefault()
    try {
      const response = await fetch(`${API_ENDPOINT}/posts/search?q=${searchTerm}`)
      const jsonData = await response.json()
      setMatchingPosts(jsonData)  
      setActiveSearch(true)
    } catch (error) {
        console.error(err.message)
    }
    setIsSearching(false)
  }

  const clearSearchPosts = async (e) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/posts`)
      const jsonData = await response.json()
      setMatchingPosts(jsonData)  
    } catch (error) {
        console.error(err.message)
    }
  }

  const setMatchingPosts = posts => {
    props.setSearchedPosts(posts)
  }

  const searchTermHandler = target => {
    setSearchTerm(target)
  }

  const resetSearch = () => {
    setSearchTerm("")
    clearSearchPosts()
    setActiveSearch(false)
  }

  if (isSearching) {
    return (
      <Fragment>
        <div id="deleting-post-container" className="upload-container fa-3x">
          <i class="fas fa-spinner fa-pulse"></i>
          <p>Searching Posts ...</p>
        </div>
      </Fragment>
    )
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
              placeholder="Search Posts"
              value={searchTerm}
            >  
            </input>
            <button id="search-btn" typeof='submit'><i className="fas fa-search"></i></button>
          </form>
          <span id="search-clear" onClick={resetSearch}>Clear Search</span>
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
            placeholder="Search Posts"  
            value={searchTerm} 
          >
          </input>
          <button id="search-btn" typeof='submit'><i className="fas fa-search"></i></button>
        </form>
      </div>
    </Fragment>
  )
}

export default Searchbar