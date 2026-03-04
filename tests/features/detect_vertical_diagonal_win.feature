Feature: Detect Vertical and Diagonal Wins
    As a game player
    I want to win when I get 4 coins in a row vertically or diagonally
    So that I have multiple paths to victory

    Diagonal Directions:

    Upward-right (↗): Bottom-left to top-right diagonal slope (column increases, row increases)
    Upward-left (↖): Top-left to bottom-right diagonal slope (column decreases, row increases)
    Acceptance Criteria:

    Game checks for 4 consecutive coins in each column (vertical win)
    Game checks for 4 consecutive coins on all upward-right diagonals (↗)
    Game checks for 4 consecutive coins on all upward-left diagonals (↖)
    Both player colors are checked independently
    Win is detected and game ends immediately
    Gherkin Scenarios:

    @story_8_detect_vertically_win
    Scenario: Player 2 wins with 4 consecutive coins stacked vertically
        Given column 4 has 4 red coins (🔴) stacked consecutively from row 1 to row 4
        When Player 2 drops a final coin in column 4
        Then the game detects a vertical win for Player 2
        And the game ends immediately

# @story_8_detect_diagonal_win
# Scenario: Player 1 wins with 4 coins in upward-right diagonal (↗)
#     Given the board has 4 yellow coins (🟡)
#     on an upward-right diagonal:
#     (row: 1, col: 2), (row: 2, col: 3),
#     (row: 3, col: 4), (row: 4, col: 5)
#     When Player 1 drops a final coin completing the diagonal
#     Then the game detects a diagonal win for Player 1
#     And the game ends immediately
