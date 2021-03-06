const ava = require('ava')
const rules = require('../../rules')

const runTest = (test) => rules.properParagraphs(test)

ava.test('proper-paragraphs: should accept valid body', (test) => {
  test.notThrows(() => runTest({
    body: 'body\n\nA new paragraph\na simple line\n\nAnother Paragraph.'
  }))
})

ava.test('proper-paragraphs: should accept valid body', (test) => {
  test.notThrows(() => runTest({
    body: 'body\n\nA new paragraph\na simple line\n\n\n\n   Another Paragraph.'
  }))
})

const errMsg = 'The first letter of any paragraph should be capitalised'

ava.test('proper-paragraphs: should reject invalid body.', (test) => {
  const error = test.throws(() => runTest({
    body: 'body\n\nA new paragraph\na simple line\n\ninvalid paragraph'
  }))
  test.is(error.message, errMsg)
})

ava.test('proper-paragraphs: should reject invalid body.', (test) => {
  const error = test.throws(() => runTest({
    body: 'body\n\nA new paragraph\na simple line\n\n\n invalid paragraph'
  }))
  test.is(error.message, errMsg)
})
