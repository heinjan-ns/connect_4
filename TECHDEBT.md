# Techdebt connect_4

[ ] in test we do game.board, this is the wrong level.
[ ] outputHeader is static
[ ] 'the game displays "Column 5 is full"' is hardcoded message in tests
[ ] shouldn't the output be a different implementation cq file? it is now coupled to board.ts. Something like cli.ts?
[ ] makeMove complexity is 10, time to do something!
[ ] CICD: No PR github actions flow implemented
[ ] every time a new game starts, the old game object is still around. Accept for now.
[ ] gameloop has positional parameters -> codesmell!
[ ] 'the game starts' -> empty test
[ ] playerStrategy.ts misses test coverage
[ ] main.ts is only tested minimally with the main.smoketest.ts. Misses lots of test-coverage

# DONE

[X] checkWins are duplicated (horizontal, vertical, diagonals) -> can be put in 1 stragegy?
[X] game should keep state (currentPlayer), not board
[X] rows and columns are hardcoded, should be a variable (maxRow, maxColumn)
