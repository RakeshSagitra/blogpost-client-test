require 'rails_helper'

describe Mutations::VoteDelete do
  let(:object) { :not_used }
  let(:user) { create :user, name: 'name' }
  let(:post) { create :post }

  def call(current_user:, context: {}, **args)
    context = Utils::Context.new(
      query: OpenStruct.new(schema: KittynewsSchema),
      values: context.merge(current_user: current_user),
      object: nil,
    )
    described_class.new(object: nil, context: context, field: nil).resolve(args)
  end

  context 'when post is upvoted' do
    before(:each) do
      post.votes.create(user: user)
    end

    it 'updates the current user' do
      expect(post.votes_count).to eq 1

      result = call(current_user: user, post_id: post.id)

      expect(result).to eq post: post, errors: []
      expect(post.reload.votes_count).to eq 0
    end
  end


  it 'requires a logged in user' do
    expect { call(current_user: nil, post_id: post.id) }.to raise_error GraphQL::ExecutionError, 'current user is missing'
  end
end
