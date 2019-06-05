import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from '../styles/piktogram.png';

import SelectedProfile from './SelectedProfile';
import Home from './Home';
import SearchBar from './SearchBar';
import NewPost from './NewPost';
import Notifications from './Notifications';
import Profile from './Profile';
import '../styles/AppRouter.css';

function AppRouter() {
	return (
		<Router>
			<div>
				<header className='d-flex flex-row justify-content-between'>
					<div className='d-flex nav_bar '>
						<img
							id='logoImg'
							src={logo}
							className='mr-1'
							alt='logo'
						/>
						<h3>Piktogram</h3>
					</div>
					<nav>
						<ul className='d-flex flex-row justify-content-around nav-ul'>
							<li>
								<Link to='/'>Home</Link>
							</li>
							<li>
								<Link to='/search/'>Search</Link>
							</li>
							<li>
								<Link to='/newpost/'>New Post</Link>
							</li>
							<li>
								<Link to='/notifications/'>Notifications</Link>
							</li>
							<li>
								<Link to='/myprofile/'>Profile</Link>
							</li>
						</ul>
					</nav>
				</header>

				<Route path='/' exact component={Home} />
				<Route path='/search/' component={SearchBar} />
				<Route path='/newpost/' component={NewPost} />
				<Route path='/notifications/' component={Notifications} />
				<Route path='/myprofile/' component={Profile} />
				<Route path='/profile/' component={SelectedProfile} />
			</div>
		</Router>
	);
}

export default AppRouter;
