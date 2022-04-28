module Mutations
  class VoteCreate < Mutations::BaseMutation
    null true

    argument :post_id, ID, required: true

    field :post, Types::PostType, null: false
    field :errors, [String], null: false

    def resolve(post_id:)
      require_current_user!

      user = context[:current_user]
      post = Post.find(post_id)
      vote = post.votes.build(user: user)
      if vote.save
        {
          post: post,
          errors: [],
        }
      else
        {
          post: nil,
          errors: vote.errors.full_messages
        }
      end
    end
  end
end