import React, { Component } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';

export default class RegisterPrompt extends Component {
  render() {
    return (
      <Card>
        <Card.Title>Uh oh... looks like you need to sign in to do that</Card.Title>
        <Button onClick={this.props.handleClose}>No Thanks</Button>
      </Card>
    )
  }
}
