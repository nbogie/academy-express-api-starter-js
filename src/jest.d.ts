declare global {
    namespace jest {
        interface Matchers<R, T = {}> {
            toBeOneOf(expected: T[]): R;
        }
    }
}

export {};
