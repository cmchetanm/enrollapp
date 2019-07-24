source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0.0.beta3'

# Use mysql as the database for Active Record
gem 'mysql2'

# Use Puma as the app server
gem 'puma'

# Use SCSS for stylesheets
gem 'sass-rails'

# ActiveModel extension that automatically strips all attributes of leading and trailing whitespace
gem 'strip_attributes'

# Zurb Foundation
gem 'autoprefixer-rails'
gem 'foundation-rails'

# Rails authentication mechanism
gem 'devise'
gem 'devise_invitable'
gem 'devise_token_auth'

# Password Strength Enforcement
gem 'strong_password'

# Zurb Foundation for emails
gem 'inky-rb', require: 'inky'
gem 'premailer-rails'

# Font Awesome Icons
gem 'font-awesome-rails'

# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '>= 4.0.0.rc.3'

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder'

# Use Resque to process Active Jobs
gem 'resque', require: 'resque/server'

# Provides hamlit generators for Rails. Hamlit = optimized HAML
gem 'haml-rails'

# Client Side Form Validations
gem 'client_side_validations'

# React Support
gem 'react-rails'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'listen'
  gem 'web-console'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen'
  # Preview email in the default browser instead of sending it.
  gem 'letter_opener'
  # Linting
  gem 'haml-lint'
  gem 'rubocop'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  # Use Foreman for managing Rails processes
  gem 'foreman', require: false
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara'
  gem 'selenium-webdriver'
  # Easy installation and use of chromedriver to run system tests with Chrome
  gem 'webdrivers'
  # Used for controller testing
  gem 'rails-controller-testing'
end

group :production do
  # File based caching
  gem 'dalli'
end
