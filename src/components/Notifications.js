import React, { Component } from 'react'
import axios from 'axios';
import urls from "../urls/url-paths";

export default class Notifications extends Component {

  state = {
    user: null
  }

  getUser = () => {
    if (localStorage.token) {
      axios({
        method: 'GET',
        url: urls.myprofile,
        headers: { token: localStorage.token }
      })
        .then(response => {
          this.setState({
            user: response.data.following
          });
          console.log(
            'App successfully recieves a response',
            response
          );
        })
        .catch(err => console.log(err));
    }
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <div>
        {this.state.user}
      </div>
    )
  }
}
