Feature: Drop Coin and Fall to Bottom Position
    As a game player
    I want to drop a coin into a column and have it settle at the lowest available row
    So that coins stack properly and physics feel realistic

    Coordinate System:
    Rows are numbered 1-6 from bottom to top (row 1 is bottom, row 6 is top)
    Columns are numbered 1-7 from left to right

    Acceptance Criteria:
    Coin drops into selected column only
    Coin falls to the lowest empty position (smallest row number) in that column
    If column is full, game rejects the move and re-prompts
    Coin position is correctly recorded on the board with accurate row and column coordinates
    Coin placement affects only the selected column, no other columns

    @story_4_drop_coin
    Scenario: Coin drops to lowest empty row in selected column
        Given a new game has been initialized
        Then the board has 42 empty positions out of 42 total
        When Player 1 drops a coin in column 3
        Then the coin lands in row 1 of column 3
        And the position records a yellow coin (🟡) at coordinates (row: 1, column: 3)
