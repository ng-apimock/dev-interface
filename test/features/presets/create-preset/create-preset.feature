@presets
@create-preset
Feature: Create preset

  Developers should be able to create a preset

  Background:
    Given ng-apimock has been initialized

  Scenario: Create a preset with mocks and variables
    Given I open the presets page
    And I create preset something with mocks and variables
    Then the preset something is created with mocks and variables

  Scenario: Create a preset with variables but without mocks
    Given I open the presets page
    And I create preset something without mocks
    Then the preset something is created with variables but without mocks

  Scenario: Create a preset with mocks but without variables
    Given I open the presets page
    And I create preset something without variables
    Then the preset something is created with mocks but without variables

  Scenario: Create a preset with a duplicate name is not possible
    Given I open the presets page
    And I create preset happy with mocks and variables
    Then An error with message 'A preset with this name already exists. Please choose another one.' has occured

  Scenario: Create a preset without mocks and variables is not possible
    Given I open the presets page
    And I create preset something without mocks and variables
    Then An error with message 'A preset needs to contain at least mocks or variables. Please deselect one of the excludes.' has occured
