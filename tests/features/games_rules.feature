Feature: As a game player
    I want to know when it's my turn and when my opponent's turn is
    So that we take turns fairly during the game

    Acceptance Criteria:

    Player 1 always makes the first move
    Game identifies which player's turn it is (Player 1 or Player 2)
    Turn alternates after each valid move
    Current player is clearly indicated before prompting for input
    Turn order is maintained throughout the game

    As a game player
    I want to select a column where I want to drop my coin
    So that I can make moves during the game

    Acceptance Criteria:
    Game prompts active player to select a column (depends on Story 5 for turn identification)
    Player can enter a column number (1-7)
    Game validates that the column number is within valid range
    Game rejects invalid inputs and re-prompts the player

    As a game player
    I want to be prevented from dropping a coin into a full column
    So that I don't make invalid moves and can choose another column

    Acceptance Criteria:
    Game checks if selected column has an empty space (depends on Story 4 for coin position tracking)
    If column is full, game displays an error message
    Player is re-prompted to select a different column
    Game continues without advancing to the next player's turn


    @story_5_1_alternate_player
    Scenario: Player 1 goes first, then turns alternate with each move
        Given a new game has been initialized
        When the game is ready for play
        Then the game indicates "Player 1's turn" (🟡)
        And Player 1 drops a coin in column 1
        And the game indicates "Player 2's turn" (🔴)
        And Player 2 drops a coin in column 1
        Then the game again indicates "Player 1's turn" (🟡)

    @story_3_player_input
    Scenario: Player enters valid column number
        Given it is Player 1 turn
        When Player 1 drops a coin in column 4
        Then the column number 4 is accepted
        And the game processes the move to drop a coin

    @story_3_1_validate_player_input
    Scenario: Player enters invalid column number outside valid range
        Given it is Player 2 turn
        When Player 2 enters column 9
        Then the input is rejected with an error message
        And Player 2 is re-prompted to select a valid column

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