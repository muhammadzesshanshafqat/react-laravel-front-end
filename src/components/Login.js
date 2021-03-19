import React, { Component } from "react";
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            incorrectCredentials: false,
            disableForm: false
        };
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRememberMeChange = this.handleRememberMeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    handleRememberMeChange(event) {
        this.setState({rememberMe: event.target.checked});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            incorrectCredentials: false,
            disableForm: true
        })
        axios.post('http://127.0.0.1/api/auth/login', {
            email: this.state.email,
            password: this.state.password,
            remember_me: this.state.rememberMe
          })
          .then((response) => {
            const responseData = response.data;
            this.props.onLogin(responseData);
            this.setState({
                disableForm: false
            })
            window.location.href = "/posts";
          })
          .catch((error) => {
            this.setState({
                incorrectCredentials: true,
                disableForm: false
            })
            console.log(error);
          });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <h3>Log In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" disabled={this.state.disableForm} value={this.state.email} onChange={this.handleEmailChange} className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" disabled={this.state.disableForm} value={this.state.password} onChange={this.handlePasswordChange} className="form-control" placeholder="Enter password" />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox"  value={this.state.rememberMe} onChange={this.handleRememberMeChange} className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit"  disabled={this.state.disableForm} className="btn btn-primary btn-block">Submit</button>
            {this.state.incorrectCredentials && <p style={{color: "red"}}>Credentials incorrect. Please try again.</p>}
        </form>
        );
    }
}