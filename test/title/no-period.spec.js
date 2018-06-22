const ava = require('ava')
const rules = require('../../rules')

const validSubject = { subject: 'Subject' }
const invalidSubject = { subject: 'Subject.' }
const runTest = (t) => rules.noPeriod(t)

ava.test('no-period: should accept valid subject', (test) => {
  test.notThrows(() => runTest(validSubject))
})

ava.test('no-period: should reject invalid subject.', (test) => {
  const error = test.throws(() => runTest(invalidSubject))
  test.is(error.message, 'The commit title should not end with a period')
})