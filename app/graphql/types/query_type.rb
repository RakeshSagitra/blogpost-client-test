module Types
  class QueryType < Types::BaseObject
    field :posts_all, [PostType], null: false
    field :viewer, ViewerType, null: true
    field :viewer_votes, [ID], null: false

    field :post, PostType, "Find a post by ID", null: false do
      argument :id, ID, required: true
    end

    field :comments, [CommentType], null: false do
      argument :post_id, ID, required: true
    end


    def posts_all
      Post.reverse_chronological.all
    end

    def viewer
      context.current_user
    end

    def viewer_votes
      Vote.where(user: context.current_user, votable_type: 'Post').pluck(:votable_id)
    end

    def post(id:)
      Post.find(id)
    end

    def comments(post_id:)
      Comment.where(post_id: post_id).includes(:user)
    end
  end
end
