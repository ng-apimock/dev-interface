@variables
@search
Feature: Search for variables

  Developers should be able to search variables matching a key

  Background:
    Given ng-apimock has been initialized

  Scenario: Search matching variables
    Given I open the variables page
    When I search for variables matching some
    Then the following variables are present with state:
      | key         | value         |
      | some-key    | some value    |
