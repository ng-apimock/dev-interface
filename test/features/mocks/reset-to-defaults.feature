@mocks
@reset-to-defaults
Feature: Reset to defaults

  Developers should be able to reset the state to default

  Scenario: Reset to defaults
    Given I open the dev interface
    When I select scenario crypto-exchanges for mock with name get items
    And I update the delay to 3000 for mock with name get items
    And I enable echoing for mock with name get items
    And I reset the mocks to defaults
    Then the following mocks state is set:
      | name          | scenario          | delay |
      | get items     | crypto-currencies | 0     |
      | post item     | ok                | 0     |
      | get something | passThrough       | 1000  |

