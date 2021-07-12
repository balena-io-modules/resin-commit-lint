const ava = require('ava')
const rules = require('../../rules')

const validBodyLowercase = {
  body: 'body\nexample: foo'
}
const validBodyUppercase = {
  body: 'body\nmore body Example: foo'
}
const validBodyAllCaps = {
  body: 'body\nEXAMPLE: foo'
}
const invalidBody = {
  body: 'body\nExample: foo'
}
const runTest = (test) => rules.noTagInBody(test)

ava.test('no-tag-in-body: should accept valid body', (test) => {
  test.notThrows(() => runTest(validBodyLowercase))
})

ava.test('no-tag-in-body: should accept valid body', (test) => {
  test.notThrows(() => runTest(validBodyUppercase))
})

ava.test('no-tag-in-body: should accept valid body', (test) => {
  test.notThrows(() => runTest(validBodyAllCaps))
})

ava.test('no-tag-in-body: should reject invalid body.', (test) => {
  const error = test.throws(() => runTest(invalidBody))
  test.is(error.message, 'Commit body should not contain footer tags')
})
