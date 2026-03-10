Feature: Bot Player
    Player 2 can be controlled by a bot

    Scenario: Initialize game with Player 1 human and Player 2 human
        Given a new game has been initialized
        And player 1 is a human player
        And player 2 is a human player
        When the game is started
        Then player 1 should be human
        And player 2 should be human

#   Scenario: Bot player makes a valid move
#     Given a new game has been initialized
#     And player 1 is a human player
#     And player 2 is a bot player
#     When player 1 drops a coin in column 3
#     And the bot player makes a move
#     Then the bot move should be in a valid column
#     And the coin should be placed on the board

#   Scenario: Bot player wins the game
#     Given a game setup with moves: "1,2,1,2,1"
#     And player 2 is a bot player
#     When the bot player makes a move
#     Then the game detects a win for Player 2
