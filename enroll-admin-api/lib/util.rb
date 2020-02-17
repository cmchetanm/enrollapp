module Util
  def self.json_array_to_object_array(array, klass)
    array.map { |item| JSON.parse(item, object_class: klass) }
  end
end
