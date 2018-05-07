const {execSync} = require('child_process');
const pkg = require('../../package.json');

describe('version command', () => {
    test('returns correct version', () => {
        expect(execSync('./bin/ci.js version').toString().trim()).toBe(pkg.version);
        expect(execSync('./bin/ci.js -v').toString().trim()).toBe(pkg.version);
        expect(execSync('./bin/ci.js --version').toString().trim()).toBe(pkg.version);
    });
});
