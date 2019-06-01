import React, { Component } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

export default class Home extends Component {
	state = {
		posts : []
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
