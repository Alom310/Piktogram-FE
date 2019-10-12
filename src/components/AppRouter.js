import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../styles/piktogram.png';

import SelectedProfile from './SelectedProfile';
import Home from './Home';
import SearchBar from './SearchBar';
import NewPost from './NewPost';
import Following from './Following';
import Profile from './Profile';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import '../styles/AppRouter.css';

function AppRouter(props) {

	if (props.isSignedIn) {
		return (
			<Router>
				<div>
					<Navbar bg="light" expand="lg">
						<Navbar.Brand href="#home">
							<img
								id='logoImg'
								src={logo}
								className='mr-1'
								alt='logo'
							/>
							Piktogram
							</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="mr-auto">
								<Nav.Link href='/'>Home</Nav.Link>
								<Nav.Link href='/search/'>Search</Nav.Link>
								<Nav.Link href='/newpost/'>New Post</Nav.Link>
								<Nav.Link href='/following/'>Following</Nav.Link>
								<Nav.Link href='/myprofile/'>Profile</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Navbar>

					<Route path='/' exact component={Home} />
					<Route path='/search/' component={SearchBar} />
					<Route path='/newpost/' component={NewPost} />
					<Route path='/following/' component={Following} />
					<Route path='/myprofile/' component={Profile} />
					<Route path='/profile/' component={SelectedProfile} />
				</div>
			</Router>
		);
	} else {
		return (
			<Router>
				<div>
					<Navbar bg="light" expand="lg">
						<Navbar.Brand href="#home">
							<img
								id='logoImg'
								src={logo}
								className='mr-1'
								alt='logo'
							/>
							Piktogram
							</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="mr-auto">
								<Nav.Link href='/'>Home</Nav.Link>
								<Nav.Link href='/search/'>Search</Nav.Link>
								<Nav.Link href='/signin/'>Sign In</Nav.Link>
								<Nav.Link href='/signup/'>Sign Up</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Navbar>

					<Route path='/' exact component={Home} />
					<Route path='/search/' component={SearchBar} />
					<Route path='/signin' component={() => <SignInForm
						signedIn={props.signedIn}
						onSignUp={props.onSignUp}
					/>}
					/>
					<Route path='/signup/' component={() => <SignUpForm
						signedIn={props.signedIn}
						onSignIn={props.onSignIn}
					/>}
					/>
				</div>
			</Router>
		);
	}
}

export default AppRouter;
