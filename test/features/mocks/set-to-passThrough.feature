@mocks
@set-to-passThroughs
Feature: Set to passThroughs

  Developers should be able to set all mocks to pass through in order to test to an actual backend

  Scenario: Set to passThroughs
    Given I open the dev interface
    When I set the mocks to passThroughs
    Then all mocks are set to passThrough
