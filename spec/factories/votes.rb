FactoryBot.define do
  factory :vote do
    association user
    votable { create(:post) }
  end
end
