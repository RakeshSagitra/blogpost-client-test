import gql from 'graphql-tag';
import * as React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import renderComponent from './utils/renderComponent';

const QUERY = gql`
query PostPage($postId: ID!) {
  viewer {
    id
  }

  post(id: $postId) {
    id
    title
    tagline
    url
    commentsCount
    votesCount
    isVoted
    user {
      name
    }
  }

  comments(postId: $postId){
    id
    text
    user{
      name
    }
  }
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

function PostsShow({ postId }) {
  const { data, loading, error } = useQuery(QUERY, {
    variables: { postId },
  });
  const [upvote, { loading: upvoteLoading }] = useMutation(UPVOTE, {
    refetchQueries: [{query: QUERY, variables: {postId}}],
  });
  const [downvote, { loading: downvoteLoading }] = useMutation(DOWNVOTE, {
    refetchQueries: [{query: QUERY, variables: {postId}}],
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const post = data.post;
  const comments = data.comments

  const navigateToLogin = () => {
    window.location.href = '/users/sign_in';
  }

  const handleUpandDownVote = (post) => {
    if(data.viewer){
      post.isVoted ? downvote({variables: {postId: post.id}}) : upvote({variables: {postId: post.id}})
    }else{
      navigateToLogin()
    }
  }

  return (
    <>
      <div className="box">
        <strong>{post.title}</strong>
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
            <button
              disabled={downvoteLoading || upvoteLoading}
              onClick={() => handleUpandDownVote(post)}
            >
              { post.isVoted ? "🔽" : "🔼" } {post.votesCount}
            </button>
            {post.commentsCount} comments | author:{' '}
            {post.user.name}
          </footer>
        </article>
      </div>
      <div className="box">
        <p><strong>Comments</strong></p>
        {comments.length == 0 && (
          <p>No comments yet</p>
        )}
        {comments.map((comment) => (
          <p>
            <strong>{comment.user.name}: </strong>
            {comment.text}
          </p>
        ))}
      </div>
    </>
  );
}

renderComponent(PostsShow);
