import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './SignInForm.css';

export default class SignInForm extends Component {
	state = {
		email    : null,
		password : null
	};

	handleInput = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSignIn = event => {
		event.preventDefault();
		axios
			.post('http://localhost:3001/users/login', {
				email    : this.state.email,
				password : this.state.password
			})
			.then(res => {
				localStorage.token = res.data.signedJwt;
				this.props.signedIn();
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div className='d-flex flex-direction-row justify-content-center '>
				<Form
					className='form'
					onSubmit={this.handleSignIn}
					autocomplete='off'
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
						<a href='#' onClick={this.props.onSignUp}>
							SignUp
						</a>
					</div>
				</Form>
			</div>
			//   <div>
			//     <form onSubmit={this.handleSignIn}>
			//       <input name="email" placeholder="Email" onChange={this.handleInput} />
			//       <input type="password" name="password" placeholder="Password" onChange={this.handleInput} />
			//       <input type="submit" name="submit" placeholder="submit" />
			//     </form>
			//     Don't have an account?
			//     <button onClick={this.props.onSignUp}>Sign Up</button>
			//   </div>
		);
	}
}
