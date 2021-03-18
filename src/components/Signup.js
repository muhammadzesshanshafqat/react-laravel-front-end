import React, { Component } from "react";
import axios from 'axios';


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }
    handleLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();

        axios.post('http://127.0.0.1/api/auth/signup', {
            name: `${this.state.firstName} ${this.state.lastName}` ,
            email: this.state.email,
            password: this.state.password
          })
          .then((response) => {
            const responseData = response.data;
            console.log('responseData: ', responseData);
            this.props.onSignup(responseData);
            window.location.href = "/log-in";
          })
          .catch((error) => {
            console.log(error);
          });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
        );
    }
}