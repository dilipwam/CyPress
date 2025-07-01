Feature: DuckDuckGo Search

  Scenario: Search for a term
    Given I am on the DuckDuckGo homepage
    When I search for "Cypress Testing"
    Then I should see results related to "Cypress"
