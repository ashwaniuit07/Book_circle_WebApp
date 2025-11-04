require "test_helper"

class PublicDashboardControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get public_dashboard_index_url
    assert_response :success
  end

  test "should get edit" do
    get public_dashboard_edit_url
    assert_response :success
  end

  test "should get update" do
    get public_dashboard_update_url
    assert_response :success
  end
end
