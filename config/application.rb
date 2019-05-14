require_relative 'boot'

require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
# require "active_storage/engine"
require 'action_controller/railtie'
require 'action_mailer/railtie'
# require "action_mailbox/engine"
# require "action_text/engine"
require 'action_view/railtie'
# require "action_cable/engine"
require 'sprockets/railtie'
require 'rails/test_unit/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Enroll
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Set default timezone for all dates and times
    config.time_zone = 'Central Time (US & Canada)'

    # Use custom exception handlers
    config.exceptions_app = routes

    # Compress HAML output
    Haml::Template.options[:remove_whitespace] = true

    # Camelize props
    # config.react.camelize_props = true # default false

    Jbuilder.key_format camelize: :lower

    # Protecting against host header attacks
    config.hosts << Rails.application.credentials[Rails.env.to_sym][:host] unless Rails.env.test?
  end
end
