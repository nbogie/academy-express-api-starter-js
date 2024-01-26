const { randomDieRoll } = require("./dice");
require("./customMatchersForJest");

test("randomDieRoll", () => {
    const possibilities = [1, 3, 4, 5, 6];
    for (let i = 0; i < 1000; i++) {
        expect(randomDieRoll()).toBeOneOf(possibilities);
    }
});
