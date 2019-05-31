import React, { Component } from 'react';
import axios from 'axios';
import EditProfile from './EditProfile';

export default class Profile extends Component {

  state = {
    user: null,
    posts: [],
    editProfile: false
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

  fetchPosts = () => {
    fetch("http://localhost:3001/posts", {
      method: "GET"
    })
      .then(results => results.json())
      .then(data => this.setState({ posts: data }))
      .catch(function (error) { console.log(error) });
  }

  _renderPosts = (post, index) => {
    if (post.user === this.state.user._id) {
      let image = `http://localhost:3001/resources/images/${post.fileName}`

      return (
        <div key={index}>
          <h3>{post.description}</h3>
          <img src={image} alt="" />
        </div>
      )
    } else {
      return null;
    }
  }

  componentDidMount = () => {
    this.getUser();
    this.fetchPosts();
  }

  setEdit = () => {
    this.setState({
      editProfile: true
    })
  }

  returnToProfile = () => {
    this.setState({
      editProfile: false
    })
    this.getUser();
  }

  render() {
    const { posts } = this.state;
    // let profileImage = `http://localhost:3001/resources/images/${this.state.user.avatar}`

    if (this.state.editProfile) {
      return <EditProfile
        user={this.state.user}
        returnToProfile={this.returnToProfile}
      />
    } else if (this.state.user) {
      let profileImage = `http://localhost:3001/resources/images/${this.state.user.avatar}`
      return (
        <div>
          <h3>{this.state.user.firstName}</h3>
          <h3>{this.state.user.lastName}</h3>
          <h3>{this.state.user.username}</h3>
          <h3>{this.state.user.bio}</h3>
          <img src={profileImage} />
          <button onClick={this.setEdit}>Edit Profile</button>
          {
            posts ?
              posts.map(this._renderPosts)
              :
              "No posts yet..."
          }
        </div>
      )
    } else {
      return null
    }
  }
}
