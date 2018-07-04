const ava = require('ava')
const rules = require('../../rules')

const validSubject = {
  subject: 'Subject'
}
const invalidSubject = {
  subject: ' Subject'
}
const runTest = (test) => rules.singleSpaceColon(test)

ava.test('single-space-colon: should accept valid subject', (test) => {
  test.notThrows(() => runTest(validSubject))
})

ava.test('single-space-colon: should reject invalid subject.', (test) => {
  const error = test.throws(() => runTest(invalidSubject))
  test.is(error.message, 'The commit title must include exactly one space after the colon')
})
