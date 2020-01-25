require 'test_helper'

class StudyUpdateNotifierJobTest < ActiveJob::TestCase
  setup do
    @user = users(:one)
    @study_version = study_versions(:one)
  end

  test 'that notifications are sent' do
    StudyUpdateNotifierJob.perform_now(@user, @study_version)
  end
end
