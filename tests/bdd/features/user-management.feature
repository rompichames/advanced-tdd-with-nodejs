Feature: User Management
  As a system administrator
  I want to manage user accounts
  So that I can control access to the system

  Background:
    Given the system is initialized

  Scenario: Create a new user with valid data
    Given I have valid user data with email "john.doe@example.com"
    When I create a new user
    Then the user should be created successfully
    And the user email should be "john.doe@example.com"

  Scenario: Cannot create user with invalid email
    Given I have user data with invalid email "invalid-email"
    When I attempt to create a new user
    Then the user creation should fail
    And I should receive an error message about invalid email

  Scenario: Update user email
    Given a user exists with email "jane.doe@example.com"
    When I update the user email to "jane.smith@example.com"
    Then the user email should be updated to "jane.smith@example.com"
    And the updated timestamp should be recent

  Scenario Outline: Validate email formats
    Given I have user data with email "<email>"
    When I attempt to create a new user
    Then the result should be "<result>"

    Examples:
      | email                    | result  |
      | valid@example.com        | success |
      | another.valid@test.org   | success |
      | invalid.email            | failure |
      | @missing-local.com       | failure |
      | missing-at-sign.com      | failure |
