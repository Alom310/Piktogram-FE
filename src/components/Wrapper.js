import React, { Component } from 'react';
import AppRouter from './AppRouter';

export default class Wrapper extends Component {

  render() {
    return (
      <div>
        <AppRouter />
      </div>
    )
  }
}
