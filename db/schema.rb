# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_26_162231) do

  create_table "admins", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "encrypted_password", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.string "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer "invitation_limit"
    t.integer "invited_by_id"
    t.string "invited_by_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_admins_on_confirmation_token", unique: true
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["invitation_token"], name: "index_admins_on_invitation_token", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_admins_on_unlock_token", unique: true
  end

  create_table "contacts", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "creator_id", limit: 36, null: false
    t.string "user_id", limit: 36
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "phone_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "fk_rails_25702ebd35"
    t.index ["last_name", "first_name"], name: "index_contacts_on_last_name_and_first_name"
    t.index ["user_id"], name: "fk_rails_8d2134e55e"
  end

  create_table "messages", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "site_id", limit: 36, null: false
    t.string "study_id", limit: 36, null: false
    t.string "user_id", limit: 36, null: false
    t.text "text", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["site_id", "study_id", "created_at"], name: "index_messages_on_site_id_and_study_id_and_created_at"
    t.index ["study_id"], name: "fk_rails_4696ca4a8c"
    t.index ["user_id"], name: "fk_rails_273a25a7a6"
  end

  create_table "shares", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "site_id", limit: 36, null: false
    t.string "study_id", limit: 36, null: false
    t.string "user_id", limit: 36, null: false
    t.string "role", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["site_id"], name: "fk_rails_2068a4fe35"
    t.index ["study_id", "user_id"], name: "index_shares_on_study_id_and_user_id", unique: true
    t.index ["user_id"], name: "fk_rails_d671d25093"
  end

  create_table "sites", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_sites_on_name"
  end

  create_table "sponsors", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "contact", null: false
    t.string "cro", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_sponsors_on_name"
  end

  create_table "studies", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "topic_id", limit: 36, null: false
    t.string "name", null: false
    t.json "inclusion_criteria"
    t.json "exclusion_criteria"
    t.string "protocol"
    t.string "agent"
    t.string "mechanism"
    t.string "side_effects"
    t.string "administration"
    t.string "randomization"
    t.string "duration"
    t.string "assessment_frequency"
    t.string "interventions"
    t.string "sponsor_name"
    t.string "sponsor_contact"
    t.string "cro_contact"
    t.string "budget"
    t.string "enrolled_or_committed"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "travel_parking_costs"
    t.index ["name"], name: "index_studies_on_name"
    t.index ["topic_id"], name: "fk_rails_09e41a5aa5"
  end

  create_table "study_versions", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "site_id", limit: 36, null: false
    t.string "study_id", limit: 36, null: false
    t.string "name", null: false
    t.json "inclusion_criteria"
    t.json "exclusion_criteria"
    t.string "protocol"
    t.string "agent"
    t.string "mechanism"
    t.string "side_effects"
    t.string "administration"
    t.string "randomization"
    t.string "duration"
    t.string "assessment_frequency"
    t.string "interventions"
    t.string "sponsor_name"
    t.string "sponsor_contact"
    t.string "cro_contact"
    t.string "budget"
    t.string "enrolled_or_committed"
    t.text "comments"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "travel_parking_costs"
    t.index ["name"], name: "index_study_versions_on_name"
    t.index ["site_id", "study_id"], name: "index_study_versions_on_site_id_and_study_id", unique: true
    t.index ["study_id"], name: "fk_rails_c2835f87a1"
  end

  create_table "topics", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "sponsor_id", limit: 36, null: false
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_topics_on_name"
    t.index ["sponsor_id"], name: "fk_rails_4e916458a9"
  end

  create_table "users", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "phone_number"
    t.string "email", null: false
    t.string "encrypted_password", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: true
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.string "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer "invitation_limit"
    t.integer "invited_by_id"
    t.string "invited_by_type"
    t.text "tokens"
    t.json "fcm_tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "contacts", "users"
  add_foreign_key "contacts", "users", column: "creator_id"
  add_foreign_key "messages", "sites"
  add_foreign_key "messages", "studies"
  add_foreign_key "messages", "users"
  add_foreign_key "shares", "sites"
  add_foreign_key "shares", "studies"
  add_foreign_key "shares", "users"
  add_foreign_key "studies", "topics"
  add_foreign_key "study_versions", "sites"
  add_foreign_key "study_versions", "studies"
  add_foreign_key "topics", "sponsors"
end
