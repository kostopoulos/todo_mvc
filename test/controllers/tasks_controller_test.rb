require 'test_helper'

class TasksControllerTest < ActionController::TestCase
  test "should return all tasks when calling index" do
  	get :index
  	assert_response :success
  end

  test "should handle get task request with existing provided id" do
  	get :show, id: 1
  	assert_response :success
  end

  test "should handle get task request with non existing provided id" do
  	get :show, id: -1
  	assert_response :success
  	json_result = JSON.parse(response.body)
  	assert( json_result.include?('error') , "Expecting error message but got #{json_result} ")
  end

  test "should save new task when providing description and status" do
  	post :create, { description: 'new todo task', status: Task.availableStatuses[:active] }
  	assert_response :created
  end

  test "should save new task when providing ony description" do
  	post :create, { description: 'new todo task'}
  	assert_response :created
  	json_result = JSON.parse(response.body)
  	assert( json_result.include?('error') == false  , "Not expecting error message but got #{json_result} ")
  end

  test "should not save new task when providing only status" do
  	post :create, { status: Task.availableStatuses[:active] }
  	assert_response :ok
  	json_result = JSON.parse(response.body)
  	assert( json_result.include?('error') , "Expecting error message but got #{json_result} ")
  end

  test "should update existing task description when provided a valid value" do
  	put :update , {id: 1 , description: 'new description', status: Task.availableStatuses[:completed]}
  	assert_response :ok
  end

  test "should update existing task description when provided only description" do
  	put :update , {id: 1 , description: 'new description'}
  	assert_response :ok
  end

  test "should update existing task description when provided only status" do
  	put :update , {id: 1 , status: Task.availableStatuses[:completed]}
  	assert_response :ok
  end

  test "should not update non existing task" do
  	put :update , {id: -1 , description: 'new description'}
  	assert_response :ok
  	json_result = JSON.parse(response.body)
  	assert( json_result.include?('error') , "Expecting error message but got #{json_result} ")
  end
end
