Feature: Login

  Scenario: Successful login
    Given I am on the login page
    When I enter username "user" and password "pass"
    And I submit the login form
    Then I should be redirected to the dashboard