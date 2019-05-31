import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

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
				<div key={index}>
					<h3>{post.description}</h3>
					<img src={image} alt='' />
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
				<div>
					<h2>Posts</h2>
					<Button onClick={this.handleSignOut}>Logout</Button>
					{posts ? posts.map(this._renderPosts) : 'No posts yet...'}
				</div>
			);
		} else {
			return null;
		}
	}
}
