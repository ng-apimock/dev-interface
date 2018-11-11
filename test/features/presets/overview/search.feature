@presets
@search
Feature: Search for presets

  Developers should be able to search presets matching a name

  Scenario: Search matching presets
    Given I open the presets page
    When I search for presets matching unh
    Then the following presets are present:
      | name    |
      | unhappy |
