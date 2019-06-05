import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/Profile.css';
import profile from '../styles/profile.jpeg';
import urls from "../urls/url-paths"

class Profile extends Component {
	state = {
		user: null,
		posts: [],
		editProfile: false
	};

	handleSignOut = () => {
		localStorage.clear();
		window.location.href = '/';
	};

	editPic = () => {
		this.setState({
			editProfile : this.state.editProfile ? false : true
		});
	};

	getUser = () => {
		if (localStorage.token) {
			axios({
				method  : 'GET',
				url     : urls.myprofile,
				headers : { token: localStorage.token }
			})
				.then(response => {
					this.setState({
						user: response.data
					});
					console.log(
						'App successfully recieves a response',
						response
					);
				})
				.catch(err => console.log(err));
		}
	};

	fetchPosts = () => {
		fetch( urls.posts, {
			method : 'GET'
		})
			.then(results => results.json())
			.then(data => this.setState({ posts: data }))
			.catch(function (error) {
				console.log(error);
			});
	};

	_renderPosts = (post, index) => {
		if (post.user === this.state.user._id) {
			let image = `${urls.images}${post.fileName}`;


			return (
				<div className='col-md-4 pb-4' key={index}>
					<div className='parent_overlay'>
						<div className='child_overlay'>{post.description}</div>
						<div className='child-content'>
							<img
								src={image}
								alt='postPicture'
								className='w-100'
							/>
						</div>
					</div>
				</div>
			);
		} else {
			return null;
		}
	};

	// TODO: need to fix uploading user profile image. 
	// _renderImage = (post, index) => {
	// 	if (post.user._id === this.state.user._id) {
	// 		let image = `http://localhost:3001/resources/images/${post.fileName}`;

	// 		return (
	// 			<div className='col-md-4 pb-4' key={index}>
	// 				<img src={image} alt='profilePicture' className='w-100' />
	// 			</div>
	// 		);
	// 	} else {
	// 		return null;
	// 	}
	// };

	componentDidMount = () => {
		this.getUser();
		this.fetchPosts();
	};

	setEdit = () => {
		this.setState({
			editProfile: true
		});

  
  handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/"
  }


	render() {
		const { posts } = this.state;
		console.log("here's are all the posts", posts);

		if (this.state.user) {
			const buttonEdit = this.state.editProfile ? (
				<div>
					<input type='file' />
					<Button onClick={this.editPic}>Cancel</Button>
				</div>
			) : (
				<Button onClick={this.editPic}>Edit!</Button>
			);
			return (
				<div className='mw-custom'>
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

								<h1>Edit Profile</h1>
								{buttonEdit}
								<Button className='submit_button'>
									Submit
								</Button>
								<h1>{posts[0].user.username}</h1>

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
							{posts ? (
								posts.map(this._renderPosts)
							) : (
									'No posts yet...'
								)}
						</Row>
					</Container>

					<Container>
						<Row>
							<Col md={12}>
								Footer. Connect with us on social media Linkedln
								elit. Perferendis, molestias.
							</Col>
						</Row>
					</Container>
					<Button onClick={this.handleSignOut}>Logout</Button>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default Profile;
