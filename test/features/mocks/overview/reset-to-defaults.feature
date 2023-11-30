@mocksw
@reset-to-defaults
Feature: Reset to defaults

  Developers should be able to reset the state to default

  Background:
    Given ng-apimock has been initialized

  Scenario: Reset to defaults
    Given I open the mocks page
    When I reset the mocks to defaults
    Then all mocks are reset to defaults
