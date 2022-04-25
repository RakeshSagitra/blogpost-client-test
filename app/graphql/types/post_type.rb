module Types
  class PostType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: false
    field :tagline, String, null: false
    field :url, String, null: false
    field :user, UserType, null: false
    field :comments_count, Int, null: false
  end
end
