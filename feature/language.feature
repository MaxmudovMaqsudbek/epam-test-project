Feature: IMDb Language Selection

  Background:
    Given I open the IMDb homepage

  Scenario: Open language selector and see languages
    When I open the language menu
    Then the language list should be visible
    And the list should contain at least one language

  Scenario: Check Spanish exists in language list
    When I open the language menu
    Then I should see "Español" in the language options

  Scenario: Change website language to German
    When I open the language menu
    And I choose the German language option
    Then the website should switch to the German version
