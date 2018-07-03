const ava = require('ava')
const {
  parse
} = require('../../lib/parser')
const fs = require('fs')
const yaml = require('js-yaml')
const _ = require('lodash')

_.each([
  'well-formed-commit',
  'missing-footer',
  'space-after-prefix',
  'space-after-column',
  'escaped-commit'
], (testName) => {
  const testCase = fs.readFileSync(`${__dirname}/commits/${testName}`, 'utf8')
  const expectedFile = fs.readFileSync(`${__dirname}/commits/${testName}.yml`,
    'utf8')
  const expected = yaml.safeLoad(expectedFile)

  ava.test(testCase, (test) => {
    if (expected.error) {
      const error = test.throws(() => {
        parse(testCase)
      })
      test.is(error.message, expected.error)
    } else {
      const parseResult = parse(testCase)
      test.deepEqual(parseResult, expected)
    }
  })
})
