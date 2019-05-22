import React, { Component } from 'react';

class SignedOut extends Component {
    render() {
        return (
            <div>
                <a href="https://api.instagram.com/oauth/authorize/?client_id=9acb7ddc5f4d47178844c1faf0907acd&redirect_uri=http://localhost:3000/redirect/&response_type=code">
                    Login with instagram
                </a>
            </div>
        );
    }
}

export default SignedOut;
