const ava = require('ava')
const rules = require('../../rules')

const validTitle = { fullTitle: 'A'.repeat(72) }
const invalidTitle = { fullTitle: 'A'.repeat(73) }
const runTest = (t) => rules.titleMaxLength(t)

ava.test('title-max-length: should accept valid title', (test) => {
  test.notThrows(() => runTest(validTitle))
})

ava.test('title-max-length: should reject invalid title', (test) => {
  const error = test.throws(() => runTest(invalidTitle))
  test.is(error.message, 'The commit title should not exceed 72 characters')
})