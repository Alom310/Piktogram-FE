import React, { Component } from 'react';
import axios from 'axios';

export default class SignUpForm extends Component {

  state = {
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    password: null
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSignUp = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/users/signup", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        localStorage.token = response.data.signedJwt;
        this.props.signedIn();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignUp}>
          <input name="firstName" placeholder="First Name" onChange={this.handleInput} />
          <input name="lastName" placeholder="Last Name" onChange={this.handleInput} />
          <input name="email" placeholder="Email" onChange={this.handleInput} />
          <input name="username" placeholder="Username" onChange={this.handleInput} />
          <input type="password" name="password" placeholder="Password" onChange={this.handleInput} />
          <input type="submit" name="submit" placeholder="submit" />
        </form>
      </div>
    )
  }
}
