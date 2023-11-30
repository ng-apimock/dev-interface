@mocks
@set-to-passThroughs
Feature: Set to passThroughs

  Developers should be able to set all mocks to pass through in order to test to an actual backend

  Background:
    Given ng-apimock has been initialized

  Scenario: Set to passThroughs
    Given I open the mocks page
    When I set the mocks to passThroughs
    Then all mocks are set to passThrough
