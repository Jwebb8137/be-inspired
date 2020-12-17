import React, { Fragment, useState, useEffect } from 'react'
import config from '../../config'
import UploadPost from '../UploadPost/UploadPost'
import Searchbar from '../Searchbar/Searchbar'
import Post from '../Post/Post'
import Loading from '../Loading/Loading'
import TextPost from '../Post/TextPost'
import FeaturedVid from '../../images/video2.mp4'
import './Feed.css'
import { useParams } from 'react-router-dom'

const Feed = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({})
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [originalPosts, setOriginalPosts] = useState([])
  const [err, setError] = useState("")
  const [listFilter, setListFilter] = useState("")
  const { API_ENDPOINT } = config;

  const setUserData = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData.id)
    setUserInfo(userData)
  }

  const getPosts = async () => {
    console.log('working ... getting posts')
    console.log(page)
    try {   
      const response = await fetch(`${API_ENDPOINT}/posts?page=${page}`)
      const jsonData = await response.json();

      setPosts(jsonData);
      setOriginalPosts(jsonData)
      setIsLoading(false)
    } catch (err) {
        console.error(err.message)
    }
  }

  const getUserPosts = async () => {
    console.log(props.match.params.UserId)
    const user = userInfo.id
    try {   
      const response = await fetch(`${API_ENDPOINT}/posts/${user}`);
      const jsonData = await response.json();
      setPosts(jsonData)
      setIsLoading(false)
    } catch (err) {
        console.error(err.message)
    }
  }

  const getMorePosts = async () => {
    console.log('working ... getting more posts')
    console.log(page)
    setPage(page => page + 1)
    const newPage = page + 1
    console.log(newPage)  
    try {   
      const response = await fetch(`${API_ENDPOINT}/posts?page=${newPage}`)
      const jsonData = await response.json();
      console.log(jsonData)
      const newList = [...posts, ...jsonData]
      setPosts(newList);
      console.log(posts)
      setIsLoading(false)
    } catch (err) {
        console.error(err.message)
    }
  }

  const setFilteredList = target => {
    console.log(posts)
    if (target === 'my-posts') {
      getUserPosts()
    }
    if (target === 'newest') {
      console.log('newest')
      const filteredList = originalPosts.sort().reverse();
      setPosts(filteredList)
    }
    if (target === 'trending') {
      let trendingPosts = originalPosts
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
      setPosts(trendingPosts)
    }
  }

  const setSearchedPosts = posts => {
    setPosts(posts)
  }

  const resetPage = () => {
    setPage(1)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setUserData()
    resetPage()
    getPosts()
  }, []);

  const button = <button id="more-posts-btn" onClick={getMorePosts}>More Posts <i class="fas fa-caret-down"></i></button>
  

  if (isLoading) {
    <Loading />
  }
  return (
    <Fragment>
      <div id="feed-container" className="fade-in-login">
        <div className="feed-inner-container">
          {/* <h1 id="feed-heading">Fuel Your Inspiration <i class="fas fa-mountain"></i></h1> */}
          <div className="featured-post">
            <video autoPlay loop muted className="featured-video">
              <source src={FeaturedVid} type="video/mp4" />
              <source src={FeaturedVid} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
          <UploadPost getPosts={getPosts} activeUser={props.activeUserInfo}/>
          <div id="feed-options">
              <span>Inspiration Feed</span>
              <div className='input-field'>
                  <label>View </label>
                  <select onChange={e => setFilteredList(e.target.value)} defaultValue="none" required>
                    <option value="trending">Discover</option>
                    <option value="newest">Newest</option>
                    <option value="my-posts">My Posts</option>
                  </select>
              </div>
          </div>
          <Searchbar setSearchedPosts={setSearchedPosts}/>
          {posts
            .map(post => {
            return (
              <Post
                key={post.id}
                contentUrl={post.content_url}
                postDescription={post.post_description}
                postUploaderId={post.post_uploader_id}
                uploadDate={post.date_created}
                postId={post.id}
                activeUser={props.activeUser}
              />
            )
          })}
          {(posts.length >= 10 && posts.length % 10 === 0 ? button : "")}
        </div>
      </div>
    </Fragment>
  )
}

export default Feed;