import * as React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import renderComponent from './utils/renderComponent';
import { POST_INDEX_QUERY } from '../graphql/query';
import { VOTE_UPDATE } from '../graphql/mutation';



function PostsIndex() {
  const { data, loading, error } = useQuery(POST_INDEX_QUERY);
  const [voteUpdate, { loading: voteLoading }] = useMutation(VOTE_UPDATE, {
    refetchQueries: [{query: POST_INDEX_QUERY}],
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const navigateToLogin = () => {
    window.location.href = '/users/sign_in';
  }

  const handleUpandDownVote = (post) => {
    if(data.viewer){
      voteUpdate({variables: {postId: post.id}})
    }else{
      navigateToLogin()
    }
  }

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
            <button
              disabled={voteLoading}
              onClick={() => handleUpandDownVote(post)}
            >
              { data.viewerVotes.includes(post.id) ? "🔽" : "🔼" } {post.votesCount}
            </button>
            <button>💬 {post.commentsCount}</button>
          </footer>
        </article>
      ))}
    </div>
  );
}

renderComponent(PostsIndex);
