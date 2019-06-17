class AddFcmTokensToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :fcm_tokens, :json, after: :tokens, null: false
    ActiveRecord::Base.connection.execute("UPDATE `users` SET `fcm_tokens` = '{}'")
  end
end
