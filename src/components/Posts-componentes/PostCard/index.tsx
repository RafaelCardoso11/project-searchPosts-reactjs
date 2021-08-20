import "./styles.css";

import { Post } from "../types";

export const PostCard = (post: Post) => {
  return (
    <div className="post">
      <img src={post.cover} alt={post.title} className={"imgCard"} />
      <div className="post-content">
        <h1 className={".title-post"}>
          {post.title}, {post.id}
        </h1>
        <p>{post.body}</p>
      </div>
    </div>
  );
};
