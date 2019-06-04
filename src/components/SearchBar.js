import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import SelectedProfile from './SelectedProfile';
import '../styles/SearchBar.css';

export default class SearchBar extends Component {
	state = {
		query         : null,
		users         : [],
		selectedUser  : null,
		renderProfile : false
	};

	fetchUsers = e => {
		e.preventDefault();
		fetch(`http://localhost:3001/users/search?s=${this.state.query}`, {
			method : 'GET'
		})
			.then(results => results.json())
			.then(data => this.setState({ users: data }))
			.catch(function(error) {
				console.log(error);
			});
	};

	_renderUsers = (user, index) => {
		return (
			<Router key={index}>
				<Link to='/profile/'>
					<h3
						onClick={() => {
							this.handleClick(user);
						}}
					>
						{user.username}
					</h3>
				</Link>
			</Router>
		);
	};

	handleInput = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleClick(user) {
		this.setState({
			selectedUser  : user,
			renderProfile : true
		});
	}

	clearProfile = () => {
		this.setState({
			renderProfile : false,
			query         : null,
			users         : []
		});
	};

	render() {
		const users = this.state.users;

		if (this.state.renderProfile) {
			return (
				<SelectedProfile
					selectedUser={this.state.selectedUser}
					clearProfile={this.clearProfile}
				/>
			);
		}

		return (
			<div className='search-user'>
				<form onSubmit={this.fetchUsers}>
					<input
						name='query'
						className='search-bar'
						placeholder='Search...'
						onChange={this.handleInput}
					/>
				</form>
				<h2>Users</h2>
				{users ? users.map(this._renderUsers) : 'No users...'}
			</div>
		);
	}
}
