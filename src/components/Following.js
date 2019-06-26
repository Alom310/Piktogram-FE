import React, { Component } from 'react'
import axios from 'axios';
import urls from "../urls/url-paths";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../styles/Following.css';

import FollowedProfile from './FollowedProfile';

export default class Notifications extends Component {

  state = {
    user: null,
    users: [],
    username: null,
    renderProfile: false
  }

  getSelectedUser = () => {
    axios
      .get(`${urls.profile}`, {
        username: this.state.username
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('Error');
      });
  };

  getUser = () => {
    if (localStorage.token) {
      axios({
        method: 'GET',
        url: urls.myprofile,
        headers: { token: localStorage.token }
      })
        .then(response => {
          this.setState({
            user: response.data
          });
          this.getFollowingList();
          console.log(
            'App successfully recieves a response',
            response
          );
        })
        .catch(err => console.log(err));
    }
  };

  getFollowingList = () => {
    let followingList = [];
    if (this.state.user) {
      for (let i = 0; i < this.state.user.following.length; i++) {
        followingList.push(this.state.user.following[i].username);
      }
      this.setState({
        users: followingList
      })
    }
  }

  _renderUsers = (user, index) => {
    return (
      <Router key={index}>
        <Link to='/profile/'>
          <h3 className="following-list"
            onClick={() => {
              this.handleClick(user);
            }}
          >
            {user}
          </h3>
        </Link>
      </Router>
    );
  };

  handleClick(user) {
    this.setState({
      username: user,
      renderProfile: true
    });
  }

  clearProfile = () => {
    this.setState({
      renderProfile: false,
      users: []
    });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const users = this.state.users;
    if (this.state.renderProfile) {
      return (
        <FollowedProfile
          username={this.state.username}
          user={this.state.user}
        />
      )
    }
    if (this.state.user) {
      return (
        <div className="following-container">
          {users ? users.map(this._renderUsers) : 'No users...'}
        </div>
      )
    }

    return null;
  }
}
