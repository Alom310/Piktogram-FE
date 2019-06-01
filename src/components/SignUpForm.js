import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import '../styles/SignUpForm.css';
export default class SignUpForm extends Component {

	state = {
		firstName: null,
		lastName: null,
		email: null,
		username: null,
		password: null,
		avatar: null,
		bio: null
	}

	handleInput = event => {
		if (event.target.name === "image") {
			this.setState({
				avatar: event.target.files[0]
			})
		} else {
			this.setState({
				[event.target.name]: event.target.value,
			});
		}
	};

	handleSignUp = event => {
		let formData = new FormData();
		formData.append("image", this.state.avatar);
		formData.append("firstName", this.state.firstName);
		formData.append("lastName", this.state.lastName);
		formData.append("email", this.state.email);
		formData.append("username", this.state.username);
		formData.append("password", this.state.password);
		formData.append("bio", this.state.bio);
		axios({
			method: "POST",
			url: `http://localhost:3001/users/signup`,
			headers: { token: localStorage.token },
			data: formData
		})
			.then(response => {
				localStorage.token = response.data.signedJwt;
				this.props.signedIn();
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div>
				<div className='d-flex flex-column align-items-center'>
					<Form
						className='signUpForm'
						onSubmit={this.handleSignUp}
						autoComplete='off'
					>
						<Form.Group controlId=''>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type='text'
								name='firstName'
								placeholder='Enter first name'
								onChange={this.handleInput}
							/>
						</Form.Group>

						<Form.Group controlId=''>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type='text'
								name='lastName'
								placeholder='Enter last name'
								onChange={this.handleInput}
							/>
						</Form.Group>

						<Form.Group controlId=''>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type='text'
								name='username'
								placeholder='Enter username'
								onChange={this.handleInput}
							/>
						</Form.Group>

						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								name='email'
								placeholder='Enter email'
								onChange={this.handleInput}
							/>
							<Form.Text className='text-muted'>
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								name='password'
								placeholder='Enter password'
								onChange={this.handleInput}
							/>
						</Form.Group>
						<Form.Group controlId='formBasicChecbox'>
							<Form.Check
								type='checkbox'
								label='I agree to the terms and conditions...'
							/>
						</Form.Group>

						<Form.Group controlId="">
							<Form.Label>Bio</Form.Label>
							<Form.Control type="text" name='bio' placeholder="Enter bio" onChange={this.handleInput} />
						</Form.Group>

						<Form.Group controlId="">
							<Form.Label>Avatar</Form.Label>
							<Form.Control type='file' name='image' placeholder="Choose your profile image" onChange={this.handleInput} />
						</Form.Group>

						<Form.Group controlId="formBasicChecbox">
							<Form.Check type="checkbox" label="I agree to the terms and conditions..." />
						</Form.Group>
						<div className="text-center">
							<Button variant="primary" type="submit">
								Submit
              </Button>
						</div>

					</Form>

				</div>

				<div className="text-center">
					Already have an account?<p className="link" onClick={this.props.onSignIn}> Sign In</p>
				</div>

			</div>
		)
	}
}
