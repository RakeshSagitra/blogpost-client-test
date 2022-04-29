class CreateVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :votes do |t|
      t.belongs_to :user, null: false, foreign_key: true
      # created this as polymorphic association so that it can be used as in various places
      # i.e. upvoting in comments and post
      t.references :votable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
