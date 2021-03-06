import React, { Component } from 'react';
import axios from 'axios';
import '../styles/NewPost.css';
import urls from "../urls/url-paths"
import { Form, Button } from 'react-bootstrap';


export default class NewPost extends Component {
	state = {
		fileName: null,
		description: null
	};

	handleChange = e => {
		console.log(e.target.name);
		if (e.target.name === 'image') {
			this.setState({
				fileName: e.target.files[0]
			});
		} else {
			this.setState({
				[e.target.name]: e.target.value
			});
		}
	};

	handleFormSubmit = (e) => {
		e.preventDefault();
		if (localStorage.token) {
			let formData = new FormData();
			formData.append('description', this.state.description);
			formData.append('image', this.state.fileName);
			axios({
				method: 'POST',
				url: urls.create_post,
				headers: { token: localStorage.token },
				data: formData,
				enctype: 'multipart/form-data'
			})
				.then(response => {
					console.log(
						'App successfully recieves a response',
						response
					);
					window.location.href = 'https://powerful-temple-57466.herokuapp.com';
				})
				.catch(err => console.log(err));
		}
	};

	render() {
		return (
			<div className="d-flex flex-row justify-content-center">
				<div className='new-post-form'>
					<Form onSubmit={this.handleFormSubmit}>
						<Form.Group controlId="">
							<Form.Label>Upload New Photo</Form.Label>
							<Form.Control type='file' id='image' name='image' accept='image/*' required placeholder="Choose image" onChange={this.handleChange} />
						</Form.Group>

						<Form.Group controlId="">
							<Form.Label>Description</Form.Label>
							<Form.Control
								onChange={this.handleChange}
								type='text'
								name='description'
								placeholder='Description'
							/>
						</Form.Group>
						<input type='submit' value='Submit' />
					</Form>
				</div>
			</div>
		);
	}
}
