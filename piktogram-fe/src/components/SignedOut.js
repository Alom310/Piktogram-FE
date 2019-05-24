import React, { Component } from 'react';

class SignedOut extends Component {
	render() {
		return (
			<div>
				<h1> Login with instagram </h1>
				<form
					action='http://10.1.7.50:3001/posts/createpost'
					method='post'
					enctype='multipart/form-data'
				>
                
					<input type='file' name='image' />
					<input type='text' name='description' />
					<input type='text' name='user' />
					<input type='submit' value='submit' />
				</form>
			</div>
		);
	}
}

export default SignedOut;
