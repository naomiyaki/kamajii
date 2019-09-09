import React, { PureComponent } from 'react';
import Posts from './DELETEPosts';
import PostForm from './DELETEPostForm';

export default class Process extends PureComponent {
  render() {
    return(
      <div className="Process">
        <Posts></Posts>
      </div>
    );
  }
}
