# Notes connect_4

- I did not got the 'press any key' to work, so I made it 'press enter'.
- I refactored the user stories a lot, without consulting the business!
- I wanted to implement the random-bot-player with the strategy pattern. Time was too short to implement this with tests, I yolo't it in main.ts.

# AI used

- AI helped me massively with the readline stuff. It was over my head to make the main.smoketest.ts work by myself with the rl.on('close') and const output = new Writable({}) magic thingies. The async getMove() with the Promise in the FakePlayer I sheepishly copied from AI. I do not understand this completely (yet).
- I used AI to build the github actions, sped building the pipeline up massively!
- I asked AI for tips for refactoring
