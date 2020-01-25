APP = YAML.load(ERB.new(File.read(Rails.root.join('config', 'settings.yml'))).result).with_indifferent_access
