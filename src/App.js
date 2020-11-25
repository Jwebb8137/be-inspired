import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Feed from './components/Feed/Feed';
import Footer from './components/Footer/Footer';
import config from './config';


function App() {

  const { API_ENDPOINT } = config;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    console.log = console.warn = console.error = () => {};
    try {
      const response = await fetch(`${API_ENDPOINT}/api/is-verified`, {
        method: "GET",
        headers: { token : localStorage.token }
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  });

  return (
    <BrowserRouter>
      <Route path="/" render={props => 
        <Navbar {...props} setAuth={setAuth} isAuth={isAuthenticated}/>
      }/>
      <Route path="/" component={Sidebar}/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/Signup" component={Signup}/>
      <Route exact path="/Feed" component={Feed}/>
      {/* <Route exact path="/signup" 
        render={props => 
          !isAuthenticated ? (
            <SignUp {...props} setAuth={setAuth} />
          ) : (
            <Redirect to="/dashboard" />
          )
        }
      /> */}
      {/* <Route 
        exact path="/Login" 
        render={props => 
          !isAuthenticated ? (
            <Login {...props} setAuth={setAuth}/>
          ) : (
            <Redirect to="/dashboard" />
          )
        }
      /> */}
      {/* <Route 
        exact path="/browse" 
        render={props => 
          <ResultsList {...props} setAuth={setAuth} isAuth={isAuthenticated}/>          
        }
      /> */}
      {/* <Route exact path="/chatlist/:user" 
        render={props => 
          isAuthenticated ? (
            <ChatList {...props} setAuth={setAuth} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />
      <Route exact path="/dashboard" 
        render={props => 
          isAuthenticated ? (
            <Dashboard {...props} setAuth={setAuth} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      /> */}
      {/* <Route path="/browse" component={ResultsList}/> */}
      {/* <Route path="/user/:userid" component={ProfileFull}/>
      <Route exact path="/chat/:userid" component={Chat}/> */}
      <Route exact path={"/home"} component={Home}/>
      <Route exact path={["/", "/Login"]} component={Footer}/>

      <div className="App">
        <header className="App-header">

        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
