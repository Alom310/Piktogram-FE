import React, { Component } from 'react'

export default class SelectedProfile extends Component {

  state = {
    posts: []
  }

  componentWillReceiveProps() {
    this.props.clearProfile();
  }

  componentDidMount = () => {
    this.fetchPosts();
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
    if (post.user === this.props.selectedUser._id) {
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

  render() {
    const { posts } = this.state;

    if (this.props.selectedUser) {
      return (
        <div>
          <h2>Posts</h2>
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
