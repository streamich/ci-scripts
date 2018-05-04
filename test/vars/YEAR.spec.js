const vars = require('../../lib/vars');

describe('YEAR', () => {
    test('returns correct year', () => {
        expect(vars.YEAR).toBe(String((new Date()).getFullYear()));
    });
});
