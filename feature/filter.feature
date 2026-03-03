Feature: IMDb Filter and Sort

  Background:
    Given I open the IMDb homepage
    When I open the main menu
    And I go to the Top 250 movies page

  Scenario: Filter movies by user rating
    When I open the filter menu
    And I set the minimum rating to 9
    And I set the maximum rating to 10
    And I close the filter menu
    Then I should see at least one movie
    And each movie rating should be between 9 and 10

  Scenario: Filter movies by number of votes
    When I open the filter menu
    And I set the minimum votes to 3000000
    And I set the maximum votes to 4000000
    And I close the filter menu
    Then I should see at least one movie
    And each movie vote count should be between 3000000 and 4000000
    And exactly 2 movies should be shown

  Scenario: Check first movie after sorting by rating (descending)
    When I open the sort menu
    And I choose sort by IMDb rating
    And I sort in descending order
    Then I should see at least one movie
    And the first movie should be "The Incredibles"
