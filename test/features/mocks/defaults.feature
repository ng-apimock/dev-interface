@mocks
@defaults
Feature: List all the available mocks

  Developers should be able to see all available mocks.
  This is a required in order to select a scenario and set the delay, so the
  application can run against those mocked responses.

  Rules:
  - Mocks that have a scenario that is marked as default should be selected by default
  - Mocks that have no scenario that is marked as default should select passThrough by default

  Scenario: Opens the mocks tab by default
    Given I open the dev interface
    Then the mocks tab is active

  Scenario: Show available mocks
    Given I open the dev interface
    Then the following mocks are present:
      | name          |
      | get items     |
      | post item     |
      | get something |

  Scenario: Show default state
    Given I open the dev interface
    Then the following mocks state is set:
      | name          | scenario          | delay |
      | get items     | crypto-currencies | 0     |
      | post item     | ok                | 0     |
      | get something | passThrough       | 1000  |