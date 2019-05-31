import React, { Component } from 'react'

export default class SelectedProfile extends Component {

  componentWillReceiveProps() {
    this.props.clearProfile();
  }

  render() {
    return (
      <div>
        {this.props.selectedUser.username}
      </div>
    )
  }
}
