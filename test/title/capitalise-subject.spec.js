const ava = require('ava')
const rules = require('../../rules')

const validSubject = {
  subject: 'Subject'
}
const invalidSubject = {
  subject: 'subject'
}
const runTest = (test) => rules.capitaliseSubject(test)

ava.test('capitalise-subject: should accept valid subject', (test) => {
  test.notThrows(() => runTest(validSubject))
})

ava.test('capitalise-subject: should reject invalid subject.', (test) => {
  const error = test.throws(() => runTest(invalidSubject))
  test.is(error.message, 'The commit subject must start with a capital letter')
})
