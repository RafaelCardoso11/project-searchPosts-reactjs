import { Component } from "react";

import "./styles.scss";

import { PostCard } from "../PostCard";
import { Post } from "../types";

export class Posts extends Component<any> {
  render() {
    let { posts } = this.props;
    return (
      <div className="posts">
        {posts.map((post: Post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            cover={post.cover}
          />
        ))}
      </div>
    );
  }
}
