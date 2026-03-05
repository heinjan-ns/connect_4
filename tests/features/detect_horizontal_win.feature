
Feature: Detect horizontal and vertical Win
    As a game player
    I want to win when I get 4 coins in a row horizontally or vertically
    So that I achieve victory through strategic play

    Acceptance Criteria:
    Game checks for 4 consecutive coins in each row or column after each move
    Both player colors are checked independently
    Win is detected regardless of position in the row
    Win condition is triggered immediately when 4-in-a-row is formed

    Scenario Outline: Player wins with 4-in-a-row
        Given a game setup with moves: <setup_moves>
        When Player <player> drops a coin in the column <final_column>
        Then the game detects a win for Player <player>
        And the game ends immediately

        Examples:
            | setup_moves     | player | final_column | win_check  |
            | "3,3,4,4,5,5"   | 1      | 6            | horizontal |
            | "1,3,3,5,5,6,6" | 2      | 4            | horizontal |
            | "3,4,3,4,3,4"   | 1      | 3            | vertical   |