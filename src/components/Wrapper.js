import React, { Component } from 'react';
import AppRouter from './AppRouter';

export default class Wrapper extends Component {

  handleSignOut = () => {
    this.setState({
      email: null,
      password: null,
    });
    this.props.signedOut()
    localStorage.clear();
    window.location.href = "/"
  };

  render() {
    return (
      <div>
        <button onClick={this.handleSignOut}>Log Out</button> 
        <AppRouter />
      </div>
    )
  }
}
