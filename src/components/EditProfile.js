import React, { Component } from 'react';
import axios from 'axios';
import urls from "../urls/url-paths";
export default class EditProfile extends Component {
	handleEditProfile = event => {
		event.preventDefault();
		axios
			.put(`${urls.users}${this.props.user._id}/update`, {
				firstName : this.state.firstName,
				lastName  : this.state.lastName,
				email     : this.state.email,
				username  : this.state.username,
				password  : this.state.password
			})
			.then(res => {
				console.log(res);
				this.props.returnToProfile();
			})
			.catch(err => {
				console.log('Error');
			});
	};

	handleInput = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	render() {
		return (
			<div>
				<form>
					<input
						name='firstName'
						placeholder={this.props.user.firstName}
						onChange={this.handleInput}
					/>
					<input
						name='lastName'
						placeholder={this.props.user.lastName}
						onChange={this.handleInput}
					/>
					<input
						name='email'
						placeholder={this.props.user.email}
						onChange={this.handleInput}
					/>
					<input
						name='username'
						placeholder={this.props.user.username}
						onChange={this.handleInput}
					/>
					<input
						name='password'
						placeholder='New Password'
						onChange={this.handleInput}
					/>
					<button name='editProfile' onClick={this.handleEditProfile}>
						Submit
					</button>
				</form>
			</div>
		);
	}
}
