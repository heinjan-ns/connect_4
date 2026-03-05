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
        Given a game setup with moves: <setup_moves>
        When Player <player> drops a coin in column <column>
        Then <outcome>
        And the move is rejected
        And Player 2 is prompted again to select another column
        And it remains Player 2 turn

        Examples:
            | setup_moves     | player | column | outcome                              |
            | "5,5,5,5,5,5,1" | 2      | 5      | the game displays "Column 5 is full" |
#| "1"             | 2      | 9      | the input is rejected with an error message |