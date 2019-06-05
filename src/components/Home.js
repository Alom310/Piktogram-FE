import React, { Component } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/Home.css';
import axios from 'axios';
export default class Home extends Component {
	state = {
		posts: [],
		content: null
	};

	handleCommentSubmit = (result) => {

		if (localStorage.token) {
			axios({
				method: 'PUT',
				url: `http://localhost:3001/posts/${result._id}/addcomment`,
				headers: { token: localStorage.token },
				data: {
					content: this.state.content
				}
			})
				.then(response => {
					console.log(
						'handleCommentSubmit response',
						response
					);
				})
				.catch(err => console.log("handleCommentSubmit has an error! ", err));
		} else {
			console.log("update token")
		}
	};

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
			[event.target.name]: event.target.value
		});
	};

	componentDidMount() {
		this.fetchPosts();
	}

	_renderPosts = (post, index) => {
		let image = `http://localhost:3001/resources/images/${post.fileName}`;
		let comments = [];
		for (let i = 0; i < post.comments.length; i++) {
			comments.push(<Card.Text>{post.comments[i].content} - <i>{post.comments[i].username}</i></Card.Text>);
		}
		return (
			<div key={index} className='home-section'>
				<Container>
					<Row>
						<Col sm={7} md={6} lg={8}>
							<Card className='card-picture'>
								<Card.Title>{post.user.username}</Card.Title>
								<Card.Body>
									<Card.Img
										variant='top'
										src={image}
										alt='personal'
									/>
									<Card.Text><b>{post.description}</b></Card.Text>
									{comments}
									<Form
										className='commentForm'
										onSubmit={() => {
											this.handleCommentSubmit(post);
										}}
										autoComplete='on'
									>
										<Form.Group controlId=''>
											<Form.Control
												type='text'
												name='content'
												placeholder='Add a comment'
												onChange={this.handleInput}
											/>
										</Form.Group>
										<Button variant="primary" type="submit">
											Submit
              			</Button>
									</Form>
								</Card.Body>
								<i className='fas fa-heart-circle' />
							</Card>
						</Col>
						<Col sm={5} xd={6} lg={4}>
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
