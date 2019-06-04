import React, { Component } from 'react'
import axios from 'axios';
import urls from "../urls/url-paths"
export default class SelectedProfile extends Component {

  state = {
    posts: [],
    user: null,
    // followers: [],
    // following: []
  }

  componentWillReceiveProps() {
    this.props.clearProfile();
  }

  componentDidMount = () => {
    this.fetchPosts();
    this.getUser();
  }

  // setFollowers = () => {
  //   this.setState({
  //     followers: this.props.selectedUser.followers.push(this.state.user._id),
  //     following: this.state.user.following.push(this.props.selectedUser._id)
  //   })
  // }

  getUser = () => {
    if (localStorage.token) {
      axios({
        method: "GET",
        url: urls.myprofile,
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
    fetch(urls.posts, {
      method: "GET"
    })
      .then(results => results.json())
      .then(data => this.setState({ posts: data }))
      .catch(function (error) { console.log(error) });
  }

  _renderPosts = (post, index) => {
    if (post.user === this.props.selectedUser._id) {
      let image = `${urls.images}${post.fileName}`
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

  // push current user id to selected user's followers array
  // push selcted user id to current user's following array

  getUser = () => {
    if (localStorage.token) {
      axios({
        method: "GET",
        url: urls.myprofile,
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

  followUser = event => {

    // let followersArr = this.props.selectedUser.followers;
    // let followingArr = this.state.user.following;
    // this.setFollowers();
    axios({
      method: "PUT",
      url: `${urls.users}${this.props.selectedUser._id}/follow`,
      headers: { token: localStorage.token }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("Error");
      })
    // axios({
    //   method: "PUT",
    //   url: `http://localhost:3001/users/${this.state.user._id}/follow`,
    //   headers: { token: localStorage.token }
    // })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log("Error");
    //   })
  };

  render() {
    const { posts } = this.state;

    if (this.props.selectedUser) {
      return (
        <div>
          <h2>Posts</h2>
          <button onClick={this.followUser}>Follow</button>
          {
            posts ?
              posts.map(this._renderPosts)
              :
              "No posts yet..."
          }
        </div>
      )
    } else {
      return null;
    }
  }
}
