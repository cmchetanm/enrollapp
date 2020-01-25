module StudiesHelper
  def study_role(role)
    StudyRole.const_get(role)
  rescue NameError
    role
  end
end
