import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import './SignUpForm.css';
export default class SignUpForm extends Component {

  state = {
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    password: null
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSignUp = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/users/signup", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        localStorage.token = response.data.signedJwt;
        this.props.signedIn();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {/* <form onSubmit={this.handleSignUp}>
          <input name="firstName" placeholder="First Name" onChange={this.handleInput} />
          <input name="lastName" placeholder="Last Name" onChange={this.handleInput} />
          <input name="email" placeholder="Email" onChange={this.handleInput} />
          <input name="username" placeholder="Username" onChange={this.handleInput} />
          <input type="password" name="password" placeholder="Password" onChange={this.handleInput} />
          <input type="submit" name="submit" placeholder="submit" />
        </form>
        Already have an account?
        <button onClick={this.props.onSignIn}>Sign In</button> */}
        <div className="d-flex flex-column align-items-center">
          <Form className='form'
            onSubmit={this.handleSignUp}
            autocomplete='off'>

            <Form.Group controlId="">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>

            <Form.Group controlId="">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>

            <Form.Group controlId="">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="I agree to the terms and conditions..." />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>

          </Form>
        </div>

        <div className="text-center">
<<<<<<< HEAD
          Already have an account?<a href='#' onClick={this.props.onSignIn}> Sign In</a>
=======
          Already have an account?<p onClick={this.props.onSignIn}>Sign In</p>
>>>>>>> abb16673a229124c79f7cd4dcd39dca71e9e5d3d
        </div>

      </div>
    )
  }
}
