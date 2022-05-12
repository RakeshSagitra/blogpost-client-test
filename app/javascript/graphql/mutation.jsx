import gql from 'graphql-tag';

export const VOTE_UPDATE = gql`
  mutation voteUpdate($postId: ID!) {
    voteUpdate(postId: $postId){
      errors
    }
  }
`;

export const COMMENT_CREATE = gql`
  mutation createComment($postId: ID!, $text: String!) {
    commentCreate(postId: $postId, text: $text){
      errors
    }
  }
`
