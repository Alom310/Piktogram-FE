import React, { Component } from 'react';
import Wrapper from './Wrapper';
import axios from 'axios';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Header from './Header';
import '../styles/Landing.css';
import urls from "../urls/url-paths"
// import 'font-awesome/css/font-awesome.min.css';
class LandingPage extends Component {
	state = {
		isSignedIn        : false,
		displaySignInForm : false
	};

	componentDidMount() {
		if (localStorage.token) {
			axios({
				method  : 'get',
				url     : urls.users,
				headers : { authorization: `Bearer ${localStorage.token}` }
			})
				.then(response => {
					console.log(
						'App successfully recieves a response',
						response
					);
					this.setState({
						isSignedIn : true
					});
				})
				.catch(err => console.log(err));
		} else {
			this.setState({
				isSignedIn : false
			});
		}
	}

	onSignIn = () => {
		this.setState({
			displaySignInForm : true
		});
	};

	onSignUp = () => {
		this.setState({
			displaySignInForm : false
		});
	};

	signedIn = () => {
		this.setState({
			isSignedIn : true
		});
	};

	signedOut = () => {
		this.setState({
			isSignedIn : false
		});
	};

	render() {
		if (this.state.isSignedIn) {
			return (
				<div>
					<Header />
					<Wrapper signedOut={this.signedOut} />
				</div>
			);
		} else if (this.state.displaySignInForm) {
			return (
				<div>
					<Header />
					<SignInForm
						signedIn={this.signedIn}
						onSignUp={this.onSignUp}
					/>
				</div>
			);
		} else {
			return (
				<div>
					<Header />
					<SignUpForm
						signedIn={this.signedIn}
						onSignIn={this.onSignIn}
					/>
				</div>
			);
		}
	}
}

export default LandingPage;
