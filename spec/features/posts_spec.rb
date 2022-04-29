require 'rails_helper'

feature 'Posts' do
  def login(user, password)
    visit root_path
    click_on 'Login'

    fill_in 'Email', with: user.email
    fill_in 'Password', with: password
    click_on 'Log in'

    expect(page).to have_content("Hi #{user.name}")
  end

  scenario 'Displaying the posts on the homepage', js: true do
    post_1 = create :post
    post_2 = create :post

    visit root_path

    expect(page).to have_content post_1.title
    expect(page).to have_content post_2.title
  end

  scenario 'Displaying the post detail page', js: true do
    post = create :post

    visit root_path
    click_on post.title

    expect(page).to have_content 'comments'
    expect(page).to have_content post.title
    expect(page).to have_content post.tagline
  end


  scenario 'when clicking on upvote button non logged in user should redirect to login screen', js: true do
    post = create :post

    visit root_path
    click_on "🔼"

    expect(page).to have_content 'Log in'
    expect(page).to have_content 'Email'
    expect(page).to have_content 'Password'
  end


  scenario 'when clicking on upvote button it should upvote and by clicking again should downvote', js: true do
    post = create :post
    user = create :user

    login(user, 'password')

    visit root_path
    click_on "🔼"

    expect(page).to have_content post.title
    expect(page).to have_content '🔽 1'

    click_on "🔽"


    expect(page).to have_content post.title
    expect(page).to have_content '🔼 0'
  end
end
