@presets
@navigate
Feature: Navigate to the presets tab

  Developers should be able to select a preset.

  Background:
    Given ng-apimock has been initialized

  Scenario: Navigate to the presets tab
    Given I open the presets page
    Then the presets tab is active