Feature: IMDb Search

  Background:
    Given I open the IMDb homepage

  Scenario: Search with a valid movie name
    When I search for "Home Alone"
    Then the first result should contain "Home Alone"
    And the first result should not contain "Back to the Future"

  Scenario: Search with a common movie name
    When I search for "Batman"
    Then I should see at least one search result

  Scenario: Check titles and links in search results
    When I search for "Matrix"
    Then each result should have a visible title
    And each result should have a working link

  Scenario: Search for a non-existing movie
    When I search for "thjsdhfjhwfjkewjkjfek"
    Then I should see a "No results found" message
