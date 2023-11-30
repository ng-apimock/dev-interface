@presets
@list
Feature: List all the available presets

  Developers should be able to see all available presets.
  This is a required in order to select a preset.

  Background:
    Given ng-apimock has been initialized

  Scenario: Show available presets
    Given I open the presets page
    Then the following presets are present:
      | name    |
      | happy   |
      | unhappy |