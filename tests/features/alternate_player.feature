Feature: As a game player
    I want to know when it's my turn and when my opponent's turn is
    So that we take turns fairly during the game

    Acceptance Criteria:

    Player 1 always makes the first move
    Game identifies which player's turn it is (Player 1 or Player 2)
    Turn alternates after each valid move
    Current player is clearly indicated before prompting for input
    Turn order is maintained throughout the game
    Gherkin Scenarios:

    Scenario: Player 1 goes first, then turns alternate with each move

        Given a new game has been initialized
        When the game is ready for play
        Then the game indicates "Player 1's turn" (🟡)
        And Player 1 drops a coin
        And the game indicates "Player 2's turn" (🔴)
        And Player 2 drops a coin
        Then the game again indicates "Player 1's turn" (🟡)