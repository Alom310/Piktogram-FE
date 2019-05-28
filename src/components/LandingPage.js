import React, { Component } from 'react';
import Wrapper from './Wrapper';
import axios from 'axios';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

class LandingPage extends Component {

	state = {
		isSignedIn: false,
		displaySignInForm: false
	}

	componentDidMount() {
		if (localStorage.token) {
			axios({
				method: "get",
				url: `http://localhost:3001/users/`,
				headers: { authorization: `Bearer ${localStorage.token}` }
			})
				.then(response => {
					console.log('App successfully recieves a response', response)
					this.setState({
						isSignedIn: true,
					});
				})
				.catch(err => console.log(err))
		} else {
			this.setState({
				isSignedIn: false
			})
		}
	}

	onSignIn = () => {
		this.setState({
			displaySignInForm: true
		})
	}

	onSignUp = () => {
		this.setState({
			displaySignInForm: false
		})
	}

	signedIn = () => {
		this.setState({
			isSignedIn: true
		})
	}

	signedOut = () => {
		this.setState({
			isSignedIn: false
		})
	}

	render() {
		if (this.state.isSignedIn) {
			return (
				<div>
					<Wrapper signedOut={this.signedOut} />
				</div>
			);
		} else if (this.state.displaySignInForm) {
			return (
				<SignInForm signedIn={this.signedIn}
					onSignUp={this.onSignUp}
				/>
			)
		} else {
			return (
				<SignUpForm signedIn={this.signedIn}
					onSignIn={this.onSignIn}
				/>
			)
		}
	}
}

export default LandingPage;
