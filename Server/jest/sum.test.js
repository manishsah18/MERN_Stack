const sum = require('./sum')

test('add two number', () => {
    expect(sum(10, 20)). toBe(30)
})