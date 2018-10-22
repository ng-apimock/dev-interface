@mocks
@reset-to-defaults
Feature: Reset to defaults

  Developers should be able to reset the state to default

  Scenario: Reset to defaults
    Given I open the dev interface
    When I reset the mocks to defaults
    Then all mocks are reset to defaults
