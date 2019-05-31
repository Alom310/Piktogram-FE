import React, { Component } from 'react';
import axios from 'axios';

export default class Profile extends Component {

  state = {
    user: null
  }

  getUser = () => {
    if (localStorage.token) {
      axios({
        method: "GET",
        url: `http://localhost:3001/users/myprofile`,
        headers: { token: localStorage.token }
      })
        .then(response => {
          this.setState({
            user: response.data
          })
          console.log('App successfully recieves a response', response)
        })
        .catch(err => console.log(err))
    }
  }

  componentDidMount = () => {
    this.getUser();
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          {this.state.user.firstName}
        </div>
      )
    } else {
      return null;
    }
  }
}
