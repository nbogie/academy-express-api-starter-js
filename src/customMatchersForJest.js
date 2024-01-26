expect.extend({
    toBeOneOf(received, expectedArray) {
        const pass = expectedArray.includes(received);
        if (pass) {
            return {
                message: () =>
                    `expected ${received} to be one of [${expectedArray.join(", ")}]`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected one of [${expectedArray.join(", ")}] but received ${received}`,
                pass: false,
            };
        }
    },
});

module.exports = {};
