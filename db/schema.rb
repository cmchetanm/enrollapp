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

ActiveRecord::Schema.define(version: 2019_06_23_021923) do

  create_table "admins", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
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
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_admins_on_confirmation_token", unique: true
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_admins_on_unlock_token", unique: true
  end

  create_table "appointments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "study_id", null: false
    t.bigint "member_id", null: false
    t.bigint "creator_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_appointments_on_creator_id"
    t.index ["member_id"], name: "index_appointments_on_member_id"
    t.index ["study_id", "member_id", "creator_id"], name: "fk_rails_appointment_uniqueness", unique: true
    t.index ["study_id"], name: "index_appointments_on_study_id"
  end

  create_table "criteria", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "study_id", null: false
    t.string "kind", null: false
    t.string "text", null: false
    t.string "owner_type", null: false
    t.bigint "owner_id", null: false
    t.string "creator_type"
    t.bigint "creator_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_type", "creator_id"], name: "index_criteria_on_creator_type_and_creator_id"
    t.index ["owner_type", "owner_id"], name: "index_criteria_on_owner_type_and_owner_id"
    t.index ["study_id"], name: "index_criteria_on_study_id"
  end

  create_table "members", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "full_name", null: false
    t.string "email", null: false
    t.string "phone_number", null: false
    t.string "role", null: false
    t.bigint "creator_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_members_on_creator_id"
    t.index ["email", "role", "creator_id"], name: "index_members_on_email_and_role_and_creator_id", unique: true
    t.index ["email"], name: "index_members_on_study_id_and_email"
    t.index ["user_id"], name: "index_members_on_user_id"
  end

  create_table "studies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "topic_id", null: false
    t.string "name", null: false
    t.string "protocol"
    t.string "agent"
    t.string "mechanism"
    t.string "side_effects"
    t.string "administration"
    t.string "randomization"
    t.string "duration"
    t.string "assessment_frequency"
    t.string "interventions"
    t.string "sponsor"
    t.string "sponsor_contact"
    t.string "cro_contact"
    t.string "budget"
    t.string "enrolled_or_committed"
    t.text "comments"
    t.boolean "published", default: false
    t.string "owner_type", null: false
    t.bigint "owner_id", null: false
    t.string "creator_type"
    t.bigint "creator_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_type", "creator_id"], name: "index_studies_on_creator_type_and_creator_id"
    t.index ["name"], name: "index_studies_on_name"
    t.index ["owner_type", "owner_id"], name: "index_studies_on_owner_type_and_owner_id"
    t.index ["topic_id"], name: "index_studies_on_topic_id"
  end

  create_table "topics", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "owner_type", null: false
    t.bigint "owner_id", null: false
    t.string "creator_type"
    t.bigint "creator_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_type", "creator_id"], name: "index_topics_on_creator_type_and_creator_id"
    t.index ["name"], name: "index_topics_on_name"
    t.index ["owner_type", "owner_id"], name: "index_topics_on_owner_type_and_owner_id"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
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
    t.text "tokens"
    t.json "fcm_tokens", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "appointments", "members", on_update: :cascade, on_delete: :cascade
  add_foreign_key "appointments", "studies", on_update: :cascade, on_delete: :cascade
  add_foreign_key "appointments", "users", column: "creator_id", on_update: :cascade, on_delete: :nullify
  add_foreign_key "criteria", "studies", on_update: :cascade, on_delete: :cascade
  add_foreign_key "members", "users", name: "fk_rails_member_creator", on_update: :cascade, on_delete: :nullify
  add_foreign_key "members", "users", on_update: :cascade, on_delete: :cascade
  add_foreign_key "studies", "topics", on_update: :cascade, on_delete: :cascade
end
