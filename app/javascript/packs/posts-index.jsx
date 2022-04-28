import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
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
      votesCount
    }

    viewerVotes
  }
`;

const UPVOTE = gql`
  mutation voteCreate($postId: ID!) {
    voteCreate(postId: $postId){
      errors
    }
  }
`;


const DOWNVOTE = gql`
  mutation voteDelete($postId: ID!) {
    voteDelete(postId: $postId){
      errors
    }
  }
`;

function PostsIndex() {
  const { data, loading, error } = useQuery(QUERY);
  const [upvote, { loading: upvoteLoading }] = useMutation(UPVOTE, {
    refetchQueries: [{query: QUERY}],
  });
  const [downvote, { loading: downvoteLoading }] = useMutation(DOWNVOTE, {
    refetchQueries: [{query: QUERY}],
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const navigateToLogin = () => {
    window.location.href = '/users/sign_in';
  }

  const handleUpandDownVote = (post) => {
    if(data.viewer){
      data.viewerVotes.includes(post.id) ? downvote({variables: {postId: post.id}}) : upvote({variables: {postId: post.id}})
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
              disabled={downvoteLoading || upvoteLoading}
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
