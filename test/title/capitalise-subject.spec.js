const ava = require('ava')
const rules = require('../../rules')

const validSubject = {
  subject: 'Subject'
}
const invalidSubject = {
  subject: 'subject'
}
const missingPrefix = {
  prefix: '',
  subject: 'subject'
}
const runTest = (test, config) => rules.capitaliseSubject(test, config)

ava.test('capitalise-subject[always]: should accept valid subject', (test) => {
  test.notThrows(() => runTest(validSubject, 'always'))
})

ava.test('capitalise-subject[always]: should reject invalid subject.', (test) => {
  const error = test.throws(() => runTest(invalidSubject, 'always'))
  test.is(error.message, 'The commit subject must start with a capital letter')
})

ava.test('capitalise-subject[with-prefix]: should accept lowercase subject when prefix is missing', (test) => {
  test.notThrows(() => runTest(missingPrefix, 'with-prefix'))
})

ava.test('capitalise-subject[never]: should accept invalid subject', (test) => {
  test.notThrows(() => runTest(invalidSubject, 'never'))
})
