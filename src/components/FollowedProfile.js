import React, { Component } from 'react'
import urls from "../urls/url-paths"
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import profile from '../styles/profile.jpeg';

export default class FollowedProfile extends Component {

  state = {
    user: null,
    followed: false,
    posts: []
  }

  componentWillReceiveProps() {
    this.props.clearProfile();
  }

  componentDidMount = () => {
    this.fetchPosts();
    this.fetchUsers();
  }

  fetchPosts = () => {
    fetch(urls.posts, {
      method: "GET"
    })
      .then(results => results.json())
      .then(data => this.setState({ posts: data }))
      .catch(function (error) { console.log(error) });
  }

  fetchUsers = () => {
    fetch(`${urls.search}${this.props.username}`, {
      method: 'GET'
    })
      .then(results => results.json())
      .then(data => {
        this.setState({ user: data[0] });
        this.checkFollowers();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  checkFollowers = () => {
    if (this.state.user) {
      for (let i = 0; i < this.state.user.followers.length; i++) {
        if (this.state.user.followers[i].username === this.props.user.username) {
          this.setState({
            followed: true
          })
          this.hideFollowButton();
        } else {
          console.log("You are not following this user");
        }
      }
    }
  }

  hideFollowButton = () => {
    var element = document.getElementById("follow");
    element.textContent = "Following ✓";
    element.removeEventListener('click', this.followUser);
  }

  _renderPosts = (post, index) => {
    if (post.user._id === this.state.user._id) {
      let image = `${urls.images}${post.fileName}`
      return (
        <div className='col-md-4 pb-4' key={index}>
          <div className='parent_overlay'>
            <div className='child_overlay'> Hello</div>
            <div className='child-content'>
              <img src={image} alt='' className='w-100' />
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  followUser = () => {
    if (this.state.followed) {
      return null;
    } else {
      axios({
        method: "PUT",
        url: `${urls.users}${this.state.user._id}/follow`,
        headers: { token: localStorage.token },
        data: {
          id: this.state.user._id,
          username: this.state.user.username,
          following: this.state.user.following,
          followers: this.state.user.followers
        }
      })
        .then(res => {
          console.log(res);
        })
      this.setState({
        followed: true
      })
      this.hideFollowButton();
    }
  };

  render() {
    const { posts } = this.state;

    if (this.state.user) {
      return (
        <div>
          {/* <h2>Posts</h2> */}
          <Container className='mt-5 pt-5 pb-5'>
            <Row>
              <Col md={3}>
                <img
                  src={profile}
                  alt='profilePic'
                  className='rounded-circle w-100'
                />
              </Col>
              <Col md={9} className='bio'>
                <h1>
                  {this.state.user.username} <Button id="follow" onClick={this.followUser.bind(this)}>Follow</Button>
                </h1>
                <ul className='d-flex'>
                  <li> 20 Posts</li>
                  <li> 30 Followers</li>
                  <li> 20 Followings</li>
                </ul>
                <h1> Bio</h1>
                Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Deserunt voluptatibus nihil
								animi est atque delectus consequatur dolore
								excepturi fugit adipisci?
							</Col>
            </Row>
          </Container>
          <Container>
            <Row className='mb-3'>
              <Col md={2}>
                <img
                  src={profile}
                  alt='profilePic'
                  className='rounded-circle w-100'
                />
                <h5 className='text-center'>Highlights</h5>
              </Col>
              <Col md={2}>
                <img
                  src={profile}
                  alt='profilePic'
                  className='rounded-circle w-100'
                />
                <h5 className='text-center'>Highlights</h5>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className='pt-5 pb-5'>
              {/* <Col md={4}></Col> */}
              {posts ? (
                posts.map(this._renderPosts)
              ) : (
                  'No posts yet...'
                )}
            </Row>
          </Container>
        </div>
      )
    } else {
      return null;
    }
  }
}
