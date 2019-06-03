import React, { Component } from 'react';
import axios from 'axios';

export default class NewPost extends Component {

  state = {
    fileName: null,
    description: null
  }

  handleChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "image") {
      this.setState({
        fileName: e.target.files[0]
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleFormSubmit = () => {
    if (localStorage.token) {
      let formData = new FormData();
      formData.append("description", this.state.description);
      formData.append("image", this.state.fileName);
      axios({
        method: "POST",
        // url: `http://localhost:3001/posts/createpost`,
        url: `https://piktogram-be.herokuapp.com/posts/createpost`,
        headers: { token: localStorage.token },
        data: formData
      })
        .then(response => {
          console.log('App successfully recieves a response', response)
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div>

        <form onSubmit={this.handleFormSubmit}>
          <input onChange={this.handleChange} type='file' name='image' />
          <input onChange={this.handleChange} type='text' name='description' />
          <input type='submit' value='Submit' />
        </form>

      </div>
    )
  }
}

