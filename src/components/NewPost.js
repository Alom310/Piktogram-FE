import React, { Component } from 'react'

export default class NewPost extends Component {
  render() {
    return (
      <div>
        <form
          action='http://localhost:3001/posts/createpost'
          method='post'
          encType='multipart/form-data'
        >

          <input type='file' name='image' />
          <input type='text' name='description' />
          <input type='text' name='user' />
          <input type='submit' value='submit' />
        </form>
      </div>
    )
  }
}
