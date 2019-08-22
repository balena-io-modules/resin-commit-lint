const ava = require('ava')
const rules = require('../../rules')

const validFooter = {
  footers: [ 'A-footer: foo' ]
}
const lowercaseFooter = {
  footers: [ 'a-footer: foo' ]
}
const cherrypickFooter = {
  footers: [
    '(cherry picked from commit f8856ecb1ec21eba9f4a292ca33fbd21de13ac02)',
    '(cherry picked from commit f8856ec)'
  ]
}

const runTest = (test) => rules.prettyTags(test)

const footerErr = (tag) => `Invalid footer tag found: ${tag}
Footer tags should have the following format: [tag-name]: [tag-value]
Tag names must start with a capital letter, only letters and - are allowed`

ava.test('pretty-tags: should accept valid footers', (test) => {
  test.notThrows(() => runTest(validFooter))
})

ava.test('pretty-tags: should reject invalid footers.', (test) => {
  const error = test.throws(() => runTest(lowercaseFooter))
  test.is(error.message, footerErr('a-footer: foo'))
})

ava.test('pretty-tags: should accept signed cherry pick commits', (test) => {
  test.notThrows(() => runTest(cherrypickFooter))
})
