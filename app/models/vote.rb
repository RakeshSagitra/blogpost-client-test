# == Schema Information
#
# Table name: votes
#
#  id           :bigint           not null, primary key
#  votable_type :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint           not null
#  votable_id   :bigint           not null
#
# Indexes
#
#  index_votes_on_user_id  (user_id)
#  index_votes_on_votable  (votable_type,votable_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Vote < ApplicationRecord
  belongs_to :user, inverse_of: :votes
  belongs_to :votable, polymorphic: true, inverse_of: :votes, counter_cache: true

  validates_uniqueness_of :user, scope: :votable, message: "You already upvoted this post."
end
