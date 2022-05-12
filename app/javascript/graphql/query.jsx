import gql from 'graphql-tag';


export const SHOW_POST_QUERY = gql`
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


export const POST_INDEX_QUERY = gql`
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
