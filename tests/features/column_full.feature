Feature: Validate Column Fullness
    As a game player
    I want to be prevented from dropping a coin into a full column
    So that I don't make invalid moves and can choose another column

    Acceptance Criteria:
    Game checks if selected column has an empty space (depends on Story 4 for coin position tracking)
    If column is full, game displays an error message
    Player is re-prompted to select a different column
    Game continues without advancing to the next player's turn

    @story_6_validate_column_full
    Scenario: Player cannot drop coin into full column and remains on their turn

        Given column 5 has 6 coins stacked (one in each row from 1 to 6)
        # And it is Player 2 turn
        When Player 2 attempts to drop a coin in column 5
        Then the game displays "Column 5 is full"
        And Player 2 is prompted again to select another column
        And it remains Player 2 turn (turn does not advance)