import React, { Component } from 'react';
import axios from 'axios';

export default class SignInForm extends Component {

  state = {
    email: null,
    password: null
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSignIn = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.token = res.data.signedJwt;
        this.props.signedIn();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignIn}>
          <input name="email" placeholder="Email" onChange={this.handleInput} />
          <input type="password" name="password" placeholder="Password" onChange={this.handleInput} />
          <input type="submit" name="submit" placeholder="submit" />
        </form>
      </div>
    )
  }
}
