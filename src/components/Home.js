import React, { Component } from 'react';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default class Home extends Component {
	state = {
		posts: [],
		content: null
	};

	handleCommentSubmit = (result) => {
		if (localStorage.token) {
			let formData = new FormData();
			formData.append("content", this.state.content);
			formData.append("post", result._id);
			axios({
				method: "POST",
				url: `http://localhost:3001/comments/createcomment`,
				headers: { token: localStorage.token },
				data: formData
			})
				.then(response => {
					console.log('App successfully recieves a response', response)
				})
				.catch(err => console.log(err))
		}
	}

	fetchPosts = () => {
		fetch('http://localhost:3001/posts', {
			method: 'GET'
		})
			.then(results => results.json())
			.then(data => this.setState({ posts: data }))
			.catch(function (error) {
				console.log(error);
			});
	};

	handleInput = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	componentDidMount() {
		this.fetchPosts();
	}

	_renderPosts = (post, index) => {
		let image = `http://localhost:3001/resources/images/${post.fileName}`;

		return (
			<div key={index}>
				<Container>
					<Row>
						<Col sm={8}>
							<Card style={{ width: '32rem' }}>
								<Card.Title>{post.user}</Card.Title>
								<Card.Body>
									<Card.Img
										variant='top'
										src={image}
										alt='personal'
									/>
									<Card.Text>{post.description}</Card.Text>
									<Card.Text>{post.comments}</Card.Text>
									<Form
										className='commentForm'
										onSubmit={() => { this.handleCommentSubmit(post) }}
										autoComplete='on'
									>
										<Form.Group controlId=''>
											<Form.Label>Comment</Form.Label>
											<Form.Control
												type='text'
												name='content'
												placeholder='Enter comment'
												onChange={this.handleInput}
											/>
										</Form.Group>
									</Form>
								</Card.Body>
								<i className='fas fa-heart-circle' />
							</Card>
						</Col>
						<Col sm={4}>
							<h1> small section</h1>
						</Col>
					</Row>
				</Container>
			</div>
		);
	};

	render() {
		const { posts } = this.state;

		return (
			<div>
				<h2>Posts</h2>
				{posts ? posts.map(this._renderPosts) : 'No posts yet...'}
			</div>
		);
	}
}
