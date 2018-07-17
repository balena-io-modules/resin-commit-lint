const ava = require('ava')
const rules = require('../../rules')

const validFooter = {
  footers: [ 'Signed-off-by: Full Name <email>' ]
}
const noEmailFooter = {
  footers: [ 'Signed-off-by: Full Name' ]
}
const noNameFooter = {
  footers: [ 'Signed-off-by: <email>' ]
}
const noSignatureFooter = {
  footers: [ 'Another-footer: foo' ]
}
const runTest = (test) => rules.signedCommits(test)

ava.test('signed-commits: should accept valid footers', (test) => {
  test.notThrows(() => runTest(validFooter))
})

ava.test('signed-commits: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(noEmailFooter))
  test.is(error.message, 'Each commit must contain the following footer: Signed-off-by: Full Name <email>')
})

ava.test('signed-commits: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(noNameFooter))
  test.is(error.message, 'Each commit must contain the following footer: Signed-off-by: Full Name <email>')
})

ava.test('signed-commits: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(noSignatureFooter))
  test.is(error.message, 'Each commit must contain the following footer: Signed-off-by: Full Name <email>')
})
