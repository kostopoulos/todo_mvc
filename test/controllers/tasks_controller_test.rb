require 'test_helper'

class TasksControllerTest < ActionController::TestCase

  def setup
  	@valid_task = Task.find(1)
  	if @valid_task.blank?
  		@valid_task = Task.new(:valid_todo)
  	end
  	@valid_task.save!
  	@task_to_delete = Task.find(2)
  	if @task_to_delete.blank?
  		@task_to_delete = Task.new(:tasks_for_deletion)
  	end
  	@task_to_delete.save!
  end

  test "should return all tasks when calling index" do
  	get :index
  	assert_response :success
  end

  test "should handle get task request with existing provided id" do
  	get :show, id: @valid_task.id
  	assert_response :success
  	assert_no_error_returned
  end

  test "should handle get task request with non existing provided id" do
  	get :show, id: -1
  	assert_response :success
  	assert_error_returned
  end

  test "should save new task when providing description and status" do
  	post :create, { description: 'new todo task', status: Task.availableStatuses[:active] }
  	assert_response :created
  	assert_no_error_returned
  end

  test "should save new task when providing ony description" do
  	post :create, { description: 'new todo task'}
  	assert_response :created
  	assert_no_error_returned
  end

  test "should not save new task when providing only status" do
  	post :create, { status: Task.availableStatuses[:active] }
  	assert_response :ok
  	assert_error_returned
  end

  test "should update existing task description when provided a valid value" do
  	put :update , {id: @valid_task.id , description: 'new description', status: Task.availableStatuses[:completed]}
  	assert_response :ok
  	assert_no_error_returned
  end

  test "should update existing task description when provided only description" do
  	put :update , {id: @valid_task.id , description: 'new description'}
  	assert_response :ok
  	assert_no_error_returned
  end

  test "should update existing task description when provided only status" do
  	put :update , {id: @valid_task.id , status: Task.availableStatuses[:completed]}
  	assert_response :ok
  	assert_no_error_returned
  end

  test "should not update non existing task" do
  	put :update , {id: -1 , description: 'new description' , status: Task.availableStatuses[:completed]}
  	assert_response :ok
  	assert_error_returned
  end

  test "should fail when deleting non existing task" do
  	delete :destroy, id: -1
  	assert_response :bad_request
  	assert_error_returned
  end

  test "should delete existing task" do
  	delete :destroy, id: @task_to_delete.id
  	assert_response :ok
  	assert_no_error_returned
  end

private 
  def assert_error_returned
  	json_result = JSON.parse(response.body)
  	assert( json_result.include?('error') , "Expecting error message but got #{json_result} ")
  end

  def assert_no_error_returned
  	json_result = JSON.parse(response.body)
  	assert( json_result.include?('error') == false  , "Not expecting error message but got #{json_result} ")
  end
end
