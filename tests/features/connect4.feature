Feature: Connect 4 Game
    As a game player
    I want to start a new game with a clean board
    So that I can begin playing Connect 4

    @story_1_initialize_board
    Scenario: New game board initializes with all empty positions
        Given the game is started
        When the board is initialized
        Then the board displays 6 rows and 7 columns And all 42 positions show empty spaces ⚪
        And columns are labeled 1 through 7
        And rows are labeled 1 through 6 (bottom to top)

    @story_12_game_instructions
    Scenario: Game displays instructions on startup and player can proceed
        Given the application is launched
        When the game starts
        Then a welcome message and basic rules are displayed
        And the rules explain board is 6 rows by 7 columns
        And the rules explain coins are dropped and fall to the lowest row
        And the rules explain Player 1 goes first, then players alternate
        And the rules explain 4-in-a-row (horizontal, vertical, or diagonal) wins
        And the rules explain a draw occurs when board is full with no winner
        And the player is prompted to press enter to start the game
        And upon pressing that key, the game begins with a fresh board