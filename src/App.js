import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import Login from './components/Login';
import SignUp from './components/Signup';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      user: {
        id: null,
        email: null,
        name: null,
      },
      token: null
    }
  

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this)
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('localUserData'));
    if (userData) {
        this.setState({
            user: {
              id: userData.user.id,
              email: userData.user.email,
              name: userData.user.name
            },
            token: userData.token
        });
    } else {
        this.setState({
          user: {
            id: null,
            email: null,
            name: null,
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
        name: responseData.name
      },
      token: responseData.access_token
    });
    localStorage.setItem('localUserData', JSON.stringify(this.state));
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
                  <li className="nav-item">
                    <Link className="nav-link" to={"/log-in"}>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                  </li>
                  <li className="nav-item">
                    <a  href={'http://127.0.0.1/api/auth/redirect'} className="nav-link">Log In with Google<i className="fab fa-google"></i></a>
                  </li>         
                </ul>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path="/log-in"  render={(props) => <Login {...props} onLogin={this.handleLogin} />}/>
                <Route exact path="/sign-up" render={(props, history) => <SignUp {...props} onSignup={this.handleSignup} history={history} />}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}