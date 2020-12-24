import React, { Fragment, useState, useEffect } from 'react'
import './App.css'
import { Route, BrowserRouter, Redirect, withRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Create from './components/Create/Create'
import Sidebar from './components/Sidebar/Sidebar'
import Loading from './components/Loading/Loading'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Feed from './components/Feed/Feed'
import Footer from './components/Footer/Footer'
import config from './config'

function App() {
  const { API_ENDPOINT } = config
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userInfo, setUserInfo]  = useState({})
  
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  const setUser = data => {
    setUserInfo(data)
  }

  async function isAuth() {
    console.log = console.warn = console.error = () => {}
    try {
      const response = await fetch(`${API_ENDPOINT}/is-verified`, {
        method: "GET",
        headers: { token : localStorage.token }
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    isAuth()
  });

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <BrowserRouter>
      <Route path="/" render={props => 
        <Navbar {...props} setAuth={setAuth} isAuth={isAuthenticated}/>
      }/>
      <Route path="/" render={props => 
        <Sidebar {...props} setAuth={setAuth} isAuth={isAuthenticated} activeUser={userInfo}/>
      }/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/Create" component={Create}/>
      <Route exact path="/Signup" 
        render={props => 
          !isAuthenticated ? (
            <Signup {...props} setAuth={setAuth} setUserInfo={setUser} isAuth={isAuthenticated}/>
          ) : (
            <Redirect to="/Feed" />
          )
        }
      />
      <Route exact path="/User/:UserId" 
        render={props => <Profile {...props} setAuth={setAuth} setUserInfo={setUser}/>}
      />
      <Route exact path="/Login" 
        render={props => 
          !isAuthenticated ? (
            <Login {...props} setAuth={setAuth} setUserInfo={setUser} isAuth={isAuthenticated}/>
          ) : (
            <Redirect to="/Feed" />
          )
        }
      />
      <Route exact path="/Feed" 
        render={props => 
          isAuthenticated ? (
            <Feed {...props} setAuth={setAuth} activeUser={userInfo}/>
          ) : (
            <Redirect to="/Login" />
          )
        }
      />
      <Route exact path={"/home"} component={Home}/>
      <Route exact path={["/", "/Home", "/About", "/Feed"]} component={Footer}/>

      <div className="App">
        <header className="App-header">
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
