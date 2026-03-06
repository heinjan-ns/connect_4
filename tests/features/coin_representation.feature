Feature: Display Current Game State
        As a game player
        I want to see the current state of the board at any time
        So that I understand what pieces are on the board and where

        Coin Representation:
        * Player 1 coins: 🟡 (yellow circle emoji)
        * Player 2 coins: 🔴 (red circle emoji)
        * Empty spaces: ⚪ (white circle symbol)

        Acceptance Criteria:
        * Board is displayed with visual representation of empty spaces using ◯
        * Player 1 coins are displayed as 🟡 and visibly distinct from Player 2 coins
        * Player 2 coins are displayed as 🔴 and visibly distinct from Player 1 coins
        * Column numbers (1-7) are clearly labeled for reference
        * Row numbers (1-6, bottom to top) are displayed on the left side
        * Board state updates after each move

    Scenario: Board displays coins with correct colors for each player
        Given a new game has been initialized
        And Player 1 drops a coin in column 1
        And Player 2 drops a coin in column 2
        When the board state is displayed
        Then Player 1 has a coin in column 1 row 1
        And Player 2 has a coin in column 2 row 1
        And the board has 40 empty positions out of 42 total

    Scenario: Game announces draw when board is full
        Given the board is completely full with no 4-in-a-row for either player
        When the game ends without a winner
        Then the final board is displayed
        And the message "Game is a Draw - all positions filled!" is displayed

# Scenario: Game announces Player 2 win and highlights winning coins
#     Given Player 2 has just completed 4-in-a-row
#     When the game ends
#     Then the final board is displayed with the winning coins marked with brackets like [🔴]
#     And the message "Player 2 wins with 4 in a row!" is displayed
