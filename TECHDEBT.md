# Techdebt connect_4

[ ] in test we do game.board, this is the wrong level.
[ ] outputHeader is static
[ ] 'the game displays "Column 5 is full"' is hardcoded message in tests
[ ] shouldn't the output be a different implementation cq file? it is now coupled to board.ts
[ ] checkWins are duplicated (horizontal, vertical, diagonals) -> can be put in 1 stragegy?

# DONE

[X] game should keep state (currentPlayer), not board
[X] rows and columns are hardcoded, should be a variable (maxRow, maxColumn)
