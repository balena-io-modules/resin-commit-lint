const ava = require('ava')
const rules = require('../../rules')

const validMessage = {
  message: [ 'A'.repeat(72), 'B'.repeat(72), 'C'.repeat(72) ].join('\n')
}
const invalidMessage = {
  message: [ 'A'.repeat(72), 'B'.repeat(73), 'C'.repeat(72) ].join('\n')
}
const runTest = (test) => rules.bodyLinesMaxLength(test)

ava.test('body-lines-max-length: should accept valid message', (test) => {
  test.notThrows(() => runTest(validMessage))
})

ava.test('body-lines-max-length: should reject invalid message.', (test) => {
  const error = test.throws(() => runTest(invalidMessage))
  test.is(error.message, 'No line in the body should exceed 72 characters')
})
