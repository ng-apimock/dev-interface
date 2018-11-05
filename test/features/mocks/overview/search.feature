@mocks
@search
Feature: Search for mocks

  Developers should be able to search mocks matching a name

  Scenario: Search matching mocks
    Given I open the mocks page
    When I search for mocks matching item
    Then the following mocks are present with state:
      | name          | scenario          | delay |
      | get items     | crypto-currencies | 0     |
      | post item     | ok                | 0     |
