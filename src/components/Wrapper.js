import React, { Component } from 'react';
import AppRouter from './AppRouter';
import axios from 'axios';
import urls from "../urls/url-paths"
export default class Wrapper extends Component {

  state = {
    isSignedIn: false
  };

  signedIn = () => {
    this.setState({
      isSignedIn: true
    });
  };

  onSignIn = () => {
    this.setState({
      displaySignInForm: true
    });
  };

  onSignUp = () => {
    this.setState({
      displaySignInForm: false
    });
  };

  componentDidMount() {
    if (localStorage.token) {
      axios({
        method: 'get',
        url: urls.users,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log(
            'App successfully recieves a response',
            response
          );
          this.setState({
            isSignedIn: true
          });
        })
        .catch(err => console.log(err));
    } else {
      this.setState({
        isSignedIn: false
      });
    }
  }

  render() {
    return (
      <div>
        <AppRouter
          isSignedIn={this.state.isSignedIn}
          signedIn={this.signedIn}
        />
      </div>
    )
  }
}
