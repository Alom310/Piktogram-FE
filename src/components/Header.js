import React, { Component } from 'react';
import './Header.css';
import logo from './piktogram.png';

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
