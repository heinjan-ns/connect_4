Feature: Game Rules and Turn Management
        As a game player
        I want the game to enforce rules for turns, input validation, and column capacity
        So that gameplay is fair and follows Connect 4 rules

        Acceptance Criteria:
        * Player 1 always makes the first move
        * Game identifies which player's turn it is (Player 1 or Player 2)
        * Turn alternates after each valid move
        * Current player is clearly indicated before prompting for input
        * Turn order is maintained throughout the game

        * Game prompts active player to select a column (depends on Story 5 for turn identification)
        * Player can enter a column number (1-7)
        * Game validates that the column number is within valid range
        * Game rejects invalid inputs and re-prompts the player

        * Game checks if selected column has an empty space (depends on Story 4 for coin position tracking)
        * If column is full, game displays an error message
        * Player is re-prompted to select a different column
        * Game continues without advancing to the next player's turn

    Background:
        Given a new game has been initialized

    Scenario Outline: Turn alternates after each valid move
        Given a game setup with moves: <moves>
        Then it is Player <player> turn

        Examples:
            | moves | player |
            | "1"   | 2      |
            | "1,2" | 1      |

    Scenario Outline: Valid column input is accepted
        When Player <player> drops a coin in column <column>
        Then the move is accepted

        Examples:
            | player | column |
            | 1      | 1      |
            | 1      | 7      |

    Scenario: Player enters invalid column number outside valid range
        When Player 1 enters column 9
        Then the input is rejected with an error message
        And Player 1 is re-prompted to select a valid column
        And it remains Player 1 turn

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