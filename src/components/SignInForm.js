import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import '../styles/SignInForm.css';
import urls from "../urls/url-paths"
import spices from "../styles/spices.jpg"
import logo from "../styles/piktogram.png"

export default class SignInForm extends Component {
	state = {
		email: null,
		password: null
	};

	handleInput = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSignIn = event => {
		console.log(urls.login)
		event.preventDefault();
		axios
			.post( urls.login, {
				email: this.state.email,
				password: this.state.password
			})
			.then(res => {
				localStorage.token = res.data.signedJwt;
				this.props.signedIn();
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div className="signUpPage">
				<div className="d-flex flex-row justify-content-center">
					<img id='titleImg' src={logo} className='mr-1' alt='logo' />
					<h1 className="Title">Piktogram</h1>
				</div>
				<div className="d-flex flex-row justify-content-center">
					<div> 
						<img className="signInImage" src={spices} />
					</div>

					<div>
						<div className='d-flex flex-direction-row justify-content-center '>
							<Form
								className='signInForm'
								onSubmit={this.handleSignIn}
								autoComplete='on'
							>
								<Form.Group controlId='formBasicEmail'>
									<Form.Label>Email address</Form.Label>
									<Form.Control
										name='email'
										type='email'
										placeholder='Enter email'
										onChange={this.handleInput}
									/>
								</Form.Group>

								<Form.Group controlId='formBasicPassword'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type='password'
										name='password'
										placeholder='Password'
										onChange={this.handleInput}
									/>
									<div className='text-center mt-2'>
										<Button
											type='submit'
											name='submit'
											placeholder='Submit'
										>
											Sign in
										</Button>
									</div>
								</Form.Group>

								<div className='text-center'>
									<p>Don't have an account?</p>
									<p className="link" onClick={this.props.onSignUp}>SignUp</p>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
