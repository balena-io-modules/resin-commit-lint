const ava = require('ava')
const rules = require('../../rules')

const validBodyLowercase = { body: 'body\nexample: foo' }
const validBodyUppercase = { body: 'body\nmore body Example: foo' }
const invalidBody = { body: 'body\nExample: foo' }
const runTest = (t) => rules.noTagInBody(t)

ava.test('no-tag-in-body: should accept valid body', (test) => {
  test.notThrows(() => runTest(validBodyLowercase))
})

ava.test('no-tag-in-body: should accept valid body', (test) => {
  test.notThrows(() => runTest(validBodyUppercase))
})

ava.test('no-tag-in-body: should reject invalid body.', (test) => {
  const error = test.throws(() => runTest(invalidBody))
  test.is(error.message, 'Commit body shoud not contain footer tags')
})