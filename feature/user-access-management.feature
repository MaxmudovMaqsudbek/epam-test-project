Feature: User Access Management
  As a user
  I want to log in or register with valid or invalid credentials
  So that I can access or create an IMDb account correctly

  Background:
    Given I am on the IMDb home page
    When I click the "Sign In" button
    Then I should be redirected to the Sign In page
    And I should see two options: "Sign In" and "Create a New Account"

  @negative
  Scenario: Missing email field
    When I click the "Create a New Account" button
    And I leave the email field empty
    And I click the Continue button
    Then I should see an error message "Enter your email or mobile phone num"

  @negative
  Scenario: Invalid email format
    When I click the "Create a New Account" button
    And I enter "wrongemail" in the email field
    And I click the Continue button
    Then I should see an error message "Wrong or Invalid email address or mobile phone number. Please correct and try again."

  @negative
  Scenario: Non-existing email
    When I click the "Create a New Account" button
    And I enter "nonexisting@example.com" in the email field
    And I click the Continue button
    Then I should see an error message "We couldn't find an IMDb account with that email address"

  @positive
  Scenario: Successful login with valid credentials
    When I click the "Create a New Account" button
    And I enter a valid email "mahmudovmaqsudbek2607@gmail.com"
    And I click the Continue button
    And I enter a valid password "Maqsudbek2607"
    And I click the Sign In button
    And I enter the received 6-digit OTP code
    And I click the final Submit button
    Then I should see my username "Maqsudbek" in the IMDb header
