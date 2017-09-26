require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  test "home index is loaded" do
    get "index"
    assert_response :success
  end
end
