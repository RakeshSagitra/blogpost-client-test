module Mutations
  class VoteUpdate < Mutations::BaseMutation
    null true

    argument :post_id, ID, required: true

    field :post, Types::PostType, null: false
    field :errors, [String], null: false

    def resolve(post_id:)
      require_current_user!

      user = context[:current_user]
      post = Post.find(post_id)
      vote = post.votes.find_by(user: user)
      if vote
        vote.destroy
      else
        vote = post.votes.create(user: user)
      end

      unless vote.errors.any?
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
