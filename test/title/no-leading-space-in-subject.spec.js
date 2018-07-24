const ava = require('ava')
const rules = require('../../rules')

const validSubject = {
  subject: 'Subject'
}
const invalidSubject = {
  subject: ' Subject'
}
const runTest = (test) => rules.noLeadingSpaceInSubject(test)

ava.test('no-leading-space-in-subject: should accept valid subject', (test) => {
  test.notThrows(() => runTest(validSubject))
})

ava.test('no-leading-space-in-subject: should reject invalid subject.', (test) => {
  const error = test.throws(() => runTest(invalidSubject))
  test.is(error.message, 'The commit subject must not start with a leading space')
})
