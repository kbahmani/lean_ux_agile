require 'spec_helper'

describe 'Manage Users' do
	let(:first_name) { 'Mason' }
	let(:last_name) { 'Shin' }
	let(:email) { 'mason.shin@spirent.com' }

	before(:all) do
		Capybara.javascript_driver = :webkit
	end

	before(:each) do
		visit '/canjs/global/index.html#users'
	end

	it 'should add new user with correct information', :js => true do
		page.should have_css("div.user_form")
		fill_in 'first_name', :with => first_name
		fill_in 'last_name', :with => last_name
		fill_in 'email', :with => email
		find("div.add_user").click
		wait_until { page.should have_css("div.ur_name") }
		page.should have_content(first_name)
	end
end