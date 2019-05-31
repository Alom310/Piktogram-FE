import React, { Component } from 'react';
export default class Home extends Component {

  state = {
    posts: [],
  }

  fetchPosts = () => {
    fetch("http://localhost:3001/posts", {
      method: "GET"
    })
      .then(results => results.json())
      .then(data => this.setState({ posts: data }))
      .catch(function (error) { console.log(error) });
  }

  componentDidMount() {
    this.fetchPosts();
  }

  _renderPosts = (post, index) => {
    let image = `http://localhost:3001/resources/images/${post.fileName}`

    return (
      <div key={index} className="postCard">
        <h4>{post.user}</h4>
        <img src={image} alt="" />
        <h4>{post.description}</h4>
      </div>
    )
  }

  render() {
    const { posts } = this.state;

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
  }
}
