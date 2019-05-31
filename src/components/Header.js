import React, { Component } from 'react';
import '../styles/Header.css'
import logo from '../styles/piktogram.png'

class Header extends Component {
	render() {
		return (
			<div>
				<header className='d-flex flex-row'>
					<img src={logo} className='mr-1' alt='logo' />
					<h3>Piktogram</h3>
				</header>
			</div>
		);
	}
}

export default Header;
