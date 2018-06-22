const ava = require('ava')
const rules = require('../../rules')

const validSubject = { subject: 'Add' }
const invalidSubject = { subject: 'Added' }
const runTest = (t) => rules.imperativeMood(t)

ava.test('imperative-mood: should accept valid subject', (test) => {
  test.notThrows(() => runTest(validSubject))
})

ava.test('imperative-mood: should reject invalid subject.', (test) => {
  const error = test.throws(() => runTest(invalidSubject))
  test.is(error.message, 'The commit subject must use the imperative mood')
})