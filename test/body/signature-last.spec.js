const ava = require('ava')
const rules = require('../../rules')

const validFooter = {
  footers: [ 'Another-footer: foo', 'Signed-off-by: Full Name <email>' ]
}
const signatureFirstFooter = {
  footers: [ 'Signed-off-by: Full Name <email>', 'Another-footer: foo' ]
}
const doubleSignatureFooter = {
  footers: [ 'Signed-off-by: Full Name <email>', 'Signed-off-by: Full Name <email>' ]
}
const emptyFooter = {
  footers: []
}
const runTest = (test) => rules.signatureLast(test)

ava.test('signature-last: should accept valid footers', (test) => {
  test.notThrows(() => runTest(validFooter))
})

ava.test('signature-last: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(signatureFirstFooter))
  test.is(error.message, 'Signed-off-by must be the last tag appearing in the footers')
})

ava.test('signature-last: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(doubleSignatureFooter))
  test.is(error.message, 'Signed-off-by must be the last tag appearing in the footers')
})

ava.test('signature-last: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(emptyFooter))
  test.is(error.message, 'Signed-off-by must be the last tag appearing in the footers')
})
