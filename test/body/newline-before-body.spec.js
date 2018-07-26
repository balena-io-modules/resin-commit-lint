const ava = require('ava')
const rules = require('../../rules')

const validBody = {
  body: '\nBody'
}
const invalidBody = {
  body: 'body'
}
const invalidBodySpacing = {
  body: '\tbody'
}
const runTest = (test) => rules.newlineBeforeBody(test)

ava.test('newline-before-body: should accept valid body', (test) => {
  test.notThrows(() => runTest(validBody))
})

ava.test('newline-before-body: should reject invalid body.', (test) => {
  const error = test.throws(() => runTest(invalidBody))
  test.is(error.message, 'The body must be separeted from title by a newline')
})

ava.test('newline-before-body: should reject invalid body.', (test) => {
  const error = test.throws(() => runTest(invalidBodySpacing))
  test.is(error.message, 'The body must be separeted from title by a newline')
})
