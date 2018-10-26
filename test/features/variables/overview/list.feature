@variables
@list
Feature: List all the available variables

  Developers should be able to see all available variables.
  This is a required in order to use these variables in mock data

  Scenario: Show available variables and state
    Given I open the variables page
    Then the following variables are present with state:
      | key         | value         |
      | some-key    | some value    |
      | another-key | another value |