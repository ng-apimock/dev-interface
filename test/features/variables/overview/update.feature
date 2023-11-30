@variables
@update
Feature: Update a variable

  Developers should be able to update a variable so it can be used for interpolation.

  Background:
    Given ng-apimock has been initialized

  Scenario: Update a variable
    Given I open the variables page
    When I update variable some-key with updated value
    Then the variable some-key is updated with value updated value