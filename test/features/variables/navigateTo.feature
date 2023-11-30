@variables
@navigate
Feature: Navigate to the variables tab

  Developers should be able to add a variable so it can be used for interpolation.

  Background:
    Given ng-apimock has been initialized

  Scenario: Navigate to the variables tab
    Given I open the variables page
    Then the variables tab is active