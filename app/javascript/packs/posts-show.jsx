import * as React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { COMMENT_CREATE, VOTE_UPDATE } from '../graphql/mutation';
import { SHOW_POST_QUERY } from '../graphql/query';
import renderComponent from './utils/renderComponent';


function PostsShow({ postId }) {
  const [comment, setComment] = React.useState('')
  const { data, loading, error } = useQuery(SHOW_POST_QUERY, {
    variables: { postId },
  });
  const [voteUpdate, { loading: voteLoading }] = useMutation(VOTE_UPDATE, {
    refetchQueries: [{query: SHOW_POST_QUERY, variables: {postId: postId}}],
  });
  const [commentCreate, { loading: commentLoading }] = useMutation(COMMENT_CREATE, {
    refetchQueries: [{query: SHOW_POST_QUERY, variables: {postId: postId}}],
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const post = data.post;
  const comments = data.comments

  const navigateToLogin = () => {
    window.location.href = '/users/sign_in';
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const sendComment = () => {
    commentCreate({variables: {postId: postId, text: comment}})
    setComment('')
  }

  const handleUpandDownVote = (post) => {
    if(data.viewer){
      voteUpdate({variables: {postId: post.id}})
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
              disabled={voteLoading}
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
        <input
          id="comment"
          value={comment}
          name="comment"
          disabled={commentLoading}
          onChange={handleCommentChange}
        />
        <button onClick={sendComment} disabled={commentLoading || !comment} >Comment</button>
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
