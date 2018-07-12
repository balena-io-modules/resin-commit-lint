const ava = require('ava')
const rules = require('../../rules')

const validMessage = {
  body: [ 'A'.repeat(72), 'B'.repeat(72), 'C'.repeat(72) ].join('\n')
}
const invalidMessage = {
  body: [ 'A'.repeat(72), 'B'.repeat(73), 'C'.repeat(72) ].join('\n')
}
const longFooters = {
  body: [ 'A'.repeat(72) ].join('\n'),
  footers: [ 'A'.repeat(73) ]
}
const runTest = (test) => rules.bodyLinesMaxLength(test)

ava.test('body-lines-max-length: should accept valid message', (test) => {
  test.notThrows(() => runTest(validMessage))
})

ava.test('body-lines-max-length: should reject invalid message.', (test) => {
  const error = test.throws(() => runTest(invalidMessage))
  test.is(error.message, 'No line in the body should exceed 72 characters')
})

ava.test('body-lines-max-length: should accept arbitrarily long footers', (test) => {
  test.notThrows(() => runTest(longFooters))
})
