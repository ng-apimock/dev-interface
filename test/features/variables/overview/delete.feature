@variables
@delete
Feature: Delete a variable

  Developers should be able to delete a variable.

  Background:
    Given ng-apimock has been initialized

  Scenario: Delete a variable
    Given I open the variables page
    When I delete variable some-key
    Then the variable some-key is deleted