Feature: Accept Player Input for Column Selection
    As a game player
    I want to select a column where I want to drop my coin
    So that I can make moves during the game

    Acceptance Criteria:
    Game prompts active player to select a column (depends on Story 5 for turn identification)
    Player can enter a column number (1-7)
    Game validates that the column number is within valid range
    Game rejects invalid inputs and re-prompts the player

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