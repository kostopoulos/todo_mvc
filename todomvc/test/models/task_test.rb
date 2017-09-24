require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  
  test "should initialise with status active" do
  	task = Task.new
  	assert task.status , Task.availableStatuses[:active]
  end
end
