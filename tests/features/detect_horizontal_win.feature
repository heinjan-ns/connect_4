
Feature: Detect Horizontal Win
    As a game player
    I want to win when I get 4 coins in a row horizontally
    So that I achieve victory through strategic play

    Acceptance Criteria:
    Game checks for 4 consecutive coins in each row after each move
    Both player colors are checked independently
    Win is detected regardless of position in the row
    Win condition is triggered immediately when 4-in-a-row is formed
    Gherkin Scenarios:

    @story_7_detect_horizontal_win
    Scenario: Player 1 wins with 4 consecutive coins horizontally in the middle of a row
        Given the board has 3 consecutive yellow coins (🟡) in row 1, columns 3-5
        When Player 1 drops a final coin completing the 4-in-a-row
        Then the game detects a horizontal win for Player 1 the game ends immediately