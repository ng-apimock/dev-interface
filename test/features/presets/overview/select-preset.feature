@presets
@select-preset
Feature: Select preset

  Developers should be able to select preset

  Background:
    Given ng-apimock has been initialized

  Scenario: Select a preset
    Given I open the presets page
    When I select preset with name happy
    Then the selected preset with name happy is selected
