@variables
@add
Feature: Add a variable

  Developers should be able to add a variable so it can be used for interpolation.

  Scenario: Add a variable
    Given I open the variables page
    When I add variable some with value thing
    Then the variable some with value thing is added