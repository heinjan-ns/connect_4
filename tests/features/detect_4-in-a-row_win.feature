
Feature: Detect horizontal and vertical Win
        As a game player
        I want to win when I get 4 coins in a row horizontally, vertically
        or diagonally
        So that I achieve victory through strategic play

        Acceptance Criteria:
        * Game checks for 4 consecutive coins in each row, column of diagonal after each move
        * Both player colors are checked independently
        * Win is detected regardless of position in the row
        * Win condition is triggered immediately when a 4-in-a-row is formed

        * Game checks for 4 consecutive coins in each column (vertical win)
        * Game checks for 4 consecutive coins in a row (horizontal win)
        * Game checks for 4 consecutive coins on all upward-right diagonals (ascending ↗)
        * Game checks for 4 consecutive coins on all downward-right diagonals (descending ↘)

    Upward-right (↗): Bottom-left to top-right diagonal slope (column increases, row increases)
    Downward-right (↘): Top-left to bottom-right diagonal slope (column decreases, row increases)

    Scenario Outline: Player wins with 4-in-a-row
        Given a game setup with moves: <setup_moves>
        When Player <player> drops a coin in column <final_column>
        Then the game detects a win for Player <player>
        And the game ends immediately

        Examples:
            | setup_moves     | player | final_column | win_check  |
            | "3,3,4,4,5,5"   | 1      | 6            | horizontal |
            | "1,3,3,5,5,6,6" | 2      | 4            | horizontal |
            | "3,4,3,4,3,4"   | 1      | 3            | vertical   |

    Scenario Outline: Player wins with 4-in-a-row in a diagonal
        Given a game setup with moves: <setup_moves>
        When Player <player> drops a coin in column <final_column>
        Then the game detects a win for Player <player>
        And the game ends immediately

        Examples:
            | setup_moves                 | player | final_column | win_check  |
            | "4,3,7,4,3,5,4,5,6,5,5,7"   | 1      | 2            | diagonal ↗ |
            | "1,2,2,3,3,3,4,4,4,5,2"     | 2      | 2            | diagonal ↘ |
            | "1,2,2,3,3,5,4,4,4,2,1,2,1" | 2      | 3            | diagonal ↘ |
