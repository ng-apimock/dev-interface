@mocks
@list
Feature: List all the available mocks

  Developers should be able to see all available mocks.
  This is a required in order to select a scenario and set the delay, so the
  application can run against those mocked responses.

  Rules:
  - Mocks that have a scenario that is marked as default should be selected by default
  - Mocks that have no scenario that is marked as default should select passThrough by default

  Scenario: Show available mocks and state
    Given I open the mocks page
    Then the following mocks are present with state:
      | name          | scenario          | delay |
      | get items     | crypto-currencies | 0     |
      | post item     | ok                | 0     |
      | get something | passThrough       | 1000  |