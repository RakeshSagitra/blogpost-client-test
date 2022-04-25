module Mutations
  class BaseMutation < GraphQL::Schema::Mutation
    def require_current_user!
      if context[:current_user].nil?
        raise GraphQL::ExecutionError, 'current user is missing' 
      end
    end
  end
end
