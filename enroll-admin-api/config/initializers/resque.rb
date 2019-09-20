Resque.redis = YAML.load(ERB.new(File.read(Rails.root.join('config', 'resque.yml'))).result)[Rails.env]
                   .with_indifferent_access[:host]
