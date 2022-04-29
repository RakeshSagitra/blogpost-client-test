module Types
  class MutationType < Types::BaseObject
    # NOTE(rstankov): More about mutations - http://graphql-ruby.org/mutations/mutation_classes.html#example-mutation-class

    field :user_update, mutation: Mutations::UserUpdate
    field :vote_update, mutation: Mutations::VoteUpdate
  end
end
