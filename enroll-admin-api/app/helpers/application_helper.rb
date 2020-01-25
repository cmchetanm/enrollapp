module ApplicationHelper
  def active?(path)
    'active' if path != root_path && request.path == path || request.path == path && path == root_path
  end
end
