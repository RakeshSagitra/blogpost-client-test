import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import renderComponent from './utils/renderComponent';

const QUERY = gql`
  query PostsPage {
    viewer {
      id
    }
    postsAll {
      id
      title
      tagline
      url
      commentsCount
    }
  }
`;

function PostsIndex() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="box">
      {data.postsAll.map((post) => (
        <article className="post" key={post.id}>
          <h2>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </h2>
          <div className="url">
            <a href={post.url}>{post.url}</a>
          </div>
          <div className="tagline">{post.tagline}</div>
          <footer>
            <button>🔼 0 </button>
            <button>💬 {post.commentsCount}</button>
          </footer>
        </article>
      ))}
    </div>
  );
}

renderComponent(PostsIndex);
