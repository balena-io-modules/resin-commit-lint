const ava = require('ava')
const rules = require('../../rules')

const validFooter = {
  footers: [ 'Change-type: minor' ]
}
const camelCaseFooter = {
  footers: [ 'Change-Type: minor' ]
}
const invalidValueFooter = {
  footers: [ 'Change-type: foo' ]
}
const noChangeTypeFooter = {
  footers: [ 'Another-footer: foo' ]
}
const runTest = (test) => rules.changeType(test)

ava.test('change-type: should accept valid footers', (test) => {
  test.notThrows(() => runTest(validFooter))
})

ava.test('change-type: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(camelCaseFooter))
  test.is(error.message, 'Each commit must contain the following footer: Change-type: patch|minor|major')
})

ava.test('change-type: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(invalidValueFooter))
  test.is(error.message, 'Each commit must contain the following footer: Change-type: patch|minor|major')
})

ava.test('change-type: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(noChangeTypeFooter))
  test.is(error.message, 'Each commit must contain the following footer: Change-type: patch|minor|major')
})
