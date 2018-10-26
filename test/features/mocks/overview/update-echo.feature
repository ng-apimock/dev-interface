@mocks
@update-echo
Feature: Update the echo indicator

  Developers should be able to echo a request

  Scenario: Update the echo indicator
    Given I open the mocks page
    When I enable echoing for mock with name get items
    Then echoing for mock with name get items is enabled
    When I disable echoing for mock with name get items
    Then echoing for mock with name get items is disabled
