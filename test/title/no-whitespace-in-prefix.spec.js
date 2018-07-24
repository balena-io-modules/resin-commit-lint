const ava = require('ava')
const rules = require('../../rules')

const validPrefix = {
  prefix: 'prefix'
}
const spacePrefix = {
  prefix: 'prefix '
}
const tabPrefix = {
  prefix: 'prefix\t'
}
const newlinePrefix = {
  prefix: 'prefix\n'
}

const runTest = (test) => rules.noWhitespaceInPrefix(test)

ava.test('no-whitespace-in-prefix: should accept valid prefix', (test) => {
  test.notThrows(() => runTest(validPrefix))
})

ava.test('no-whitespace-in-prefix: should reject invalid prefix.', (test) => {
  const error = test.throws(() => runTest(spacePrefix))
  test.is(error.message, 'Prefix should not contain any whitespace')
})

ava.test('no-whitespace-in-prefix: should reject invalid prefix.', (test) => {
  const error = test.throws(() => runTest(tabPrefix))
  test.is(error.message, 'Prefix should not contain any whitespace')
})

ava.test('no-whitespace-in-prefix: should reject invalid prefix.', (test) => {
  const error = test.throws(() => runTest(newlinePrefix))
  test.is(error.message, 'Prefix should not contain any whitespace')
})
