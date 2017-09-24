require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  
  test "should initialise with status active" do
  	task = Task.new
  	assert task.status , Task.availableStatuses[:active]
  end

  test "should not save task without description" do
  	task = Task.new
  	task.description = ''
  	assert_raises ActiveRecord::RecordInvalid do
  		task.save!
  	end
  end

  test "should not save task when status is not a valid value" do
  	task = Task.new
  	task.status = Task.availableStatuses.length + 1
  	assert_raises ActiveRecord::RecordInvalid do
  		task.save!
  	end
  end
end
