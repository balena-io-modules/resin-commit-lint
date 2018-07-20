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
const runTest = (test) => rules.changeTypeFixedSpelling(test)

ava.test('change-type-fixed-spelling: should accept valid footers', (test) => {
  test.notThrows(() => runTest(validFooter))
})

ava.test('change-type-fixed-spelling: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(camelCaseFooter))
  test.is(error.message, 'Change-type should follow this exact format (case-sensitive): Change-type: patch|minor|major')
})

ava.test('change-type-fixed-spelling: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(invalidValueFooter))
  test.is(error.message, 'Change-type should follow this exact format (case-sensitive): Change-type: patch|minor|major')
})

ava.test('change-type-fixed-spelling: should accept footers with no change-type', (test) => {
  test.notThrows(() => runTest(noChangeTypeFooter))
})
