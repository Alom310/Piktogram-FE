import React, { Component } from 'react'
import axios from 'axios';
import urls from "../urls/url-paths"
import profile from '../styles/profile.jpeg';
import { Button, Container, Row, Col } from 'react-bootstrap';

export default class SelectedProfile extends Component {

  state = {
    posts: [],
    user: null,
    followed: false,
  }

  componentWillReceiveProps() {
    this.props.clearProfile();
  }

  componentDidMount = () => {
    this.fetchPosts();
    this.getUser();
    // this.hideButton();
  }

  checkFollowers = () => {
    if (this.props.selectedUser) {
      for (let i = 0; i < this.props.selectedUser.followers.length; i++) {
        if (this.props.selectedUser.followers[i].username === this.state.user.username) {
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
      // function removeEvent(el, type, handler) {
      //   if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
      // }
      var element = document.getElementById("follow");
      element.textContent = "Following ✓";
      element.removeEventListener('click', this.followUser);
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
            user: response.data
          });
          this.checkFollowers();
          console.log(
            'App successfully recieves a response',
            response
          );
        })
        .catch(err => console.log(err));
    }
  };

  // getUser = () => {
  //   if (localStorage.token) {
  //     axios({
  //       method: "GET",
  //       url: urls.profile,
  //       headers: { token: localStorage.token }
  //     })
  //       .then(response => {
  //         this.setState({
  //           user: response.data
  //         })
  //         console.log('App successfully recieves a response', response)
  //       })
  //       .catch(err => console.log(err))
  //   }
  // }

  fetchPosts = () => {
    fetch(urls.posts, {
      method: "GET"
    })
      .then(results => results.json())
      .then(data => this.setState({ posts: data }))
      .catch(function (error) { console.log(error) });
  }

  _renderPosts = (post, index) => {
    if (post.user._id === this.props.selectedUser._id) {
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
        url: `${urls.users}${this.props.selectedUser._id}/follow`,
        headers: { token: localStorage.token },
        data: {
          id: this.props.selectedUser._id,
          username: this.props.selectedUser.username,
          following: this.props.selectedUser.following,
          followers: this.props.selectedUser.followers
        }
      })
        .then(res => {
          console.log(res);
        })
        this.setState({
          followed: true
        })
        this.hideFollowButton();
        // .catch(err => {
        //   console.log("Error");
        // })
    }
  };

  // hideButton = () => {
  //   console.log(this.props.selectedUser);
  // for (let i = 0; i < this.props.selectedUser.following.length; i++) {
  //     if (this.props.selectedUser.following[i].username === this.state.user.username) {
  //       return (
  //         <div>
  //           Hello
  //         </div>
  //       )
  //     }
  //   }
  // }

  render() {
    const { posts } = this.state;

    if (this.props.selectedUser) {
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
                  {this.props.selectedUser.username} <Button id="follow" onClick={this.followUser.bind(this)}>Follow</Button>
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
