@mocks
@update-delay
Feature: Update the mock delay

  Developers should be able to delay a response

  Scenario: Update the delay
    Given I open the mocks page
    When I update the delay to 3000 for mock with name get items
    Then the delay for mock with name get items is changed to 3000
