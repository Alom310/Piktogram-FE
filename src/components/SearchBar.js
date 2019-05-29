import React, { Component } from 'react';

export default class SearchBar extends Component {

  state = {
    query: null,
    users: []
  }

  fetchUsers = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/users/search?s=${this.state.query}`, {
      method: "GET"
    })
      .then(results => results.json())
      .then(data => this.setState({ users: data }))
      .catch(function (error) { console.log(error) });
  }

  _renderUsers = (user, index) => {
    return (
      <div key={index}>
        <h3>{user.username}</h3>
      </div>
    )
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };



  render() {

    const users = this.state.users;

    // const resultsMarkup = this.state.users.map((result, key) => {
    //   return (
    //     <div key={key}>
    //     {result.username}
    //     </div>
    //   )
    // })

    return (
      <div>
        <form onSubmit={this.fetchUsers}>
        <input name="query" className="search-bar" placeholder="Search..." onChange={this.handleInput}/>
        </form>
        <h2>Users</h2>
        {
          users ?
            users.map(this._renderUsers)
            :
            "No users..."
        }
      </div>
    )

  }
}
