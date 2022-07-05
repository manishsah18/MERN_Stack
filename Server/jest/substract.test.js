const substract = require('./substract')

test('substract two number', () => {
    expect(substract(100, 20)). toBe(80)
})