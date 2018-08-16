const ava = require('ava')
const rules = require('../../rules')

const validMessage = {
  body: [ 'A'.repeat(72), 'B'.repeat(72), 'C'.repeat(72) ].join('\n')
}
const invalidMessage = {
  body: [ 'A'.repeat(72), 'B'.repeat(73), 'C'.repeat(72) ].join('\n')
}
const longFooters = {
  body: 'A'.repeat(72),
  footers: [ 'A'.repeat(73) ]
}
const messageWithUrl = {
  body: `${'A'.repeat(40)}https://resin.io/${'A'.repeat(32)}`
}
const invalidLongMessageWithUrl = {
  body: `${'A'.repeat(40)} https://resin.io/ ${'A'.repeat(33)}`
}
const invalidMessageWithUrl = {
  body: [ 'A'.repeat(40), 'https://resin.io/', 'A'.repeat(73) ].join('\n')
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

ava.test('body-lines-max-length: should accept long line containing url', (test) => {
  test.notThrows(() => runTest(messageWithUrl))
})

ava.test('body-lines-max-length: should reject invalid message with url.', (test) => {
  const error = test.throws(() => runTest(invalidLongMessageWithUrl))
  test.is(error.message, 'No line in the body should exceed 72 characters')
})

ava.test('body-lines-max-length: should reject invalid message with url.', (test) => {
  const error = test.throws(() => runTest(invalidMessageWithUrl))
  test.is(error.message, 'No line in the body should exceed 72 characters')
})
