import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import Login from './components/Login';
import SignUp from './components/Signup';
import Posts from './components/Posts';
import axios from 'axios';
import CreatePost from './components/CreatePost';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      user: {
        id: null,
        email: null,
        name: null,
        email_verified_at: null,
        created_at: null,
        updated_at: null
      },
      token: null
    }
  
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getUser=this.getUser.bind(this);
    this.clearState=this.clearState.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.showMyPosts = this.showMyPosts.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('localUserData'));
    if (userData) {
        this.setState({
            user: {
              id: userData.user.id,
              email: userData.user.email,
              name: userData.user.name,
              email_verified_atat: userData.user.email_verified_at,
              created_at: userData.user.created_at,
              updated_at: userData.user.updated_at
            },
            token: userData.token
        });
    } else {
        this.setState({
          user: {
            id: null,
            email: null,
            name: null,
            email_verified_at: null,
            created_at: null,
            updated_at: null
          },
          token: null
        });
    }
  }

  handleSignup(responseData) {
    this.setState({
      email: responseData.email
    });
  }

  handleLogin(responseData) {
    this.setState({
      user: {
        id: responseData.id,
        email: responseData.email,
        name: responseData.name,
        email_verified_at: responseData.user.email_verified_at,
        created_at: responseData.user.created_at,
        updated_at: responseData.user.updated_at
      },
      token: responseData.access_token
    });
    localStorage.setItem('localUserData', JSON.stringify(this.state));
  }

  //fix logout
  handleLogout() {
    console.log("user: ", this.state.user)
    const config = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    };

    axios.post('http://127.0.0.1/api/auth/logout', {
      id: this.state.user.id,
      name: this.state.user.name,
      email: this.state.user.email,
      email_verified_at: this.state.user.email_verified_at,
      created_at: this.state.user.created_at,
      updated_at: this.state.user.updated_at
    }, config)
    .then((response) => {
      if(response.status === 200) {
        this.clearState();
        window.location.href = "/log-in";
      } else {
        console.error("Error while logging out. Please investigate.")
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  clearState() {
    localStorage.removeItem("localUserData");
    this.setState({
      user: {
        id: null,
        email: null,
        name: null,
        email_verified_at: null,
        created_at: null,
        updated_at: null
      },
      token: null
    });
  }

  handleCreatePost() {
    window.location.href = '/create-post';
  }

  showMyPosts() {
    window.location.href = '/posts'
  }

  getUser() {
    return this.state.user;
  }

  loginWithGoogle() {
    axios.get('http://127.0.0.1/api/auth/redirect')
      .then((response) => {
        console.log('response', response);
        window.location.href = response.data.url;
      })
  }
  
  
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>Laravel-Task</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  { !this.state.token 
                      ? <li className="nav-item">
                          <Link className="nav-link" to={"/log-in"}>Login</Link>
                        </li>
                      : null
                  }

                  { !this.state.token 
                      ? <li className="nav-item">
                          <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                        </li>
                      : null
                  }

                  { !this.state.token 
                      ? <li className="nav-item">
                          <a onClick={this.loginWithGoogle} className="nav-link">Log In with Google<i className="fab fa-google"></i></a>
                        </li>
                      : null
                  }
                
                  { this.state.token 
                      ? <li className="nav-item" style={{margin: "2px"}}>
                          <button style={{color: 'white'}} className="nav-link btn btn-primary btn-block" onClick={this.handleLogout}>Logout</button>
                        </li>
                      : null
                  }

                  { this.state.token 
                      ? <li className="nav-item" style={{margin: "2px"}}>
                          <button style={{color: 'white'}} className="nav-link btn btn-primary btn-block" onClick={this.handleCreatePost}>Create Post</button>
                        </li>
                      : null
                  }

                  { this.state.token 
                      ? <li className="nav-item" style={{margin: "2px"}}>
                          <button style={{color: 'white'}} className="nav-link btn btn-primary btn-block" onClick={this.showMyPosts}>My Posts</button>
                        </li>
                      : null
                  }
                          
                </ul>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper" style={{height: "100%", overflowY:"scroll"}}>
            <div className="auth-inner">
              <Switch>
                <Route exact path='/'exact path="/log-in"  render={(props, history) => <Login {...props} onLogin={this.handleLogin} history={history} />} />
                <Route exact path="/log-in"  render={(props, history) => <Login {...props} onLogin={this.handleLogin} history={history} />}/>
                <Route exact path="/sign-up" render={(props, history) => <SignUp {...props} onSignup={this.handleSignup} history={history} />}/>
                <Route exact path='/posts'render={(props) => <Posts {...props} getUser={this.getUser} />}/>
                <Route exact path='/create-post'render={(props) => <CreatePost {...props} getUser={this.getUser} />}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}