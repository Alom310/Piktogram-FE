import React, { Component } from 'react';
import { Card, Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import RegisterPrompt from './RegisterPrompt';
import SignInForm from './SignInForm';
import '../styles/Home.css';
import axios from 'axios';
import urls from "../urls/url-paths";
export default class Home extends Component {
	state = {
		posts: [],
		content: null,
		isSignedIn: false,
		displayRegistrationError: false
	};


	handleCommentSubmit = (result) => {
		if (localStorage.token) {
			axios({
				method: 'PUT',
				url: `${urls.posts}${result._id}/addcomment`,
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
			this.setState({
				displayRegistrationError: true
			});
		}
	};

	fetchPosts = () => {
		fetch(urls.posts, {
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

	signedOut = () => {
		this.setState({
			isSignedIn: false
		});
	};

	componentDidMount() {
		this.fetchPosts();
	}

	_renderPosts = (post, index) => {
		// let image = `http://localhost:3001/resources/images/${post.fileName}`;
		let image = post.fileName;
		// let image = `https://cors-anywhere.herokuapp.com/https://immense-spire-50040.herokuapp.com/resources/images/${post.fileName}`
		let comments = [];
		for (let i = 0; i < post.comments.length; i++) {
			comments.push(<ListGroup.Item key={i}>{post.comments[i].content} - <i>{post.comments[i].username}</i></ListGroup.Item>);
		}
		return (
			<div key={index} className='home-section'>
				<Container>
					<Row>
						<Col sm={7} md={6} lg={8}>
							<Card className='card-picture'>
								<Card.Body>
									<Card.Title><p className="username">{post.user.username}</p></Card.Title>
									<Card.Img
										variant='top'
										src={image}
										alt='personal'
									/>
									<Card.Text><b className="post-description">{post.description}</b></Card.Text>
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
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		);
	};

	render() {
		const { posts } = this.state;

		if (this.state.displayRegistrationError) {
			return (
				<RegisterPrompt
					handleClose={this.handleClose}
				/>
			);
		} else {
			return (
				<div>
					{posts ? posts.map(this._renderPosts) : 'No posts yet...'}
				</div>
			);
		}
	}
}
