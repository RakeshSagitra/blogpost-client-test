import * as React from 'react';
import renderComponent from './utils/renderComponent';

function PostsShow({ postId }) {
  const post = { user: {} };

  return (
    <>
      <div className="box">
        <strong>TODO: Show info about post with id {postId}.</strong>
        <br />
        <em>Find js file at "app/javascript/packs/posts-show.jsx"</em>
      </div>
      <div className="box">
        <article className="post">
          <h2>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </h2>
          <div className="url">
            <a href={post.url} target="_blank">
              {post.url}
            </a>
          </div>
          <div className="tagline">{post.tagline}</div>
          <footer>
            <button>🔼 0 </button> {post.commentsCount} comments | author:{' '}
            {post.user.name}
          </footer>
        </article>
      </div>
      <div className="box">
        <strong>TODO: Show post comments</strong>
      </div>
    </>
  );
}

renderComponent(PostsShow);
