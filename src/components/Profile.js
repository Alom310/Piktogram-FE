import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/Profile.css';

export default class Profile extends Component {
	state = {
		user  : null,
		posts : []
	};

	handleSignOut = () => {
		localStorage.clear();
		window.location.href = '/';
	};

	getUser = () => {
		if (localStorage.token) {
			axios({
				method  : 'GET',
				url     : `http://localhost:3001/users/myprofile`,
				headers : { token: localStorage.token }
			})
				.then(response => {
					this.setState({
						user : response.data
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
		fetch('http://localhost:3001/posts', {
			method : 'GET'
		})
			.then(results => results.json())
			.then(data => this.setState({ posts: data }))
			.catch(function(error) {
				console.log(error);
			});
	};

	_renderPosts = (post, index) => {
		if (post.user === this.state.user._id) {
			let image = `http://localhost:3001/resources/images/${post.fileName}`;

			return (
				<div className='col-md-4' key={index}>
					{/* <Col md={4} key={index}> */}
					{/* <h3>{post.description}</h3> */}
					<img src={image} alt='' className='w-100' />
					{/* </Col> */}
					{/* <h3>{post.description}</h3>
					<img src={image} alt='' /> */}
				</div>
			);
		} else {
			return null;
		}
	};

	componentDidMount = () => {
		this.getUser();
		this.fetchPosts();
	};

	render() {
		const { posts } = this.state;

		if (this.state.user) {
			return (
				<div className='mw-custom'>
					{/* <h2>Posts</h2> */}
					<Container className='mt-5'>
						<Row>
							<Col md={3}>[[profile picture]]</Col>
							<Col md={9}>
								<h1> BIO</h1>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Deserunt voluptatibus nihil
								animi est atque delectus consequatur dolore
								excepturi fugit adipisci?
							</Col>
						</Row>
					</Container>

					<Container>
						<Row>
							<Col md={2}>[[storyimage]]</Col>
							<Col md={2}>[[storyimage]]</Col>
						</Row>
					</Container>

					<Container>
						<Row>
							{/* <Col md={4}></Col> */}
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
								Footer. Lorem ipsum dolor sit, amet consectetur
								adipisicing elit. Perferendis, molestias.
							</Col>
						</Row>
					</Container>

					{/* {posts ? posts.map(this._renderPosts) : 'No posts yet...'} */}
					<Button onClick={this.handleSignOut}>Logout</Button>
				</div>
			);
		} else {
			return null;
		}
	}
}
