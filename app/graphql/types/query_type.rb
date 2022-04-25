module Types
  class QueryType < Types::BaseObject
    field :posts_all, [PostType], null: false

    field :viewer, ViewerType, null: true

    def posts_all
      Post.reverse_chronological.all
    end

    def viewer
      context.current_user
    end
  end
end
