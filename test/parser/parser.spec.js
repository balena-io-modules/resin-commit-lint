const ava = require('ava')
const {
  parse
} = require('../../lib/parser')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const _ = require('lodash')

const tests = _.filter(fs.readdirSync(`${__dirname}/commits`), (filename) => {
  return path.extname(filename) !== '.yml'
})

_.each(tests, (testName) => {
  const testCase = fs.readFileSync(`${__dirname}/commits/${testName}`, 'utf8')
  const expectedFile = fs.readFileSync(`${__dirname}/commits/${testName}.yml`,
    'utf8')
  const expected = yaml.safeLoad(expectedFile)

  ava.test(testName, (test) => {
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
