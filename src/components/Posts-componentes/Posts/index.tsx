import { Component } from 'react';

import './styles.scss';

import { PostCard } from '../PostCard';
import { Post } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Posts extends Component<any> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    const { posts } = this.props;
    return (
      <div className="posts">
        {posts.map((post: Post) => (
          <PostCard key={post.id} id={post.id} title={post.title} body={post.body} cover={post.cover} />
        ))}
      </div>
    );
  }
}
