const ava = require('ava')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const _ = require('lodash')

const {
  parse
} = require('../../lib/parser')
const {
  runRules,
  readConfig,
  getDefaultConfigPath
} = require('../../lib/runner')

const tests = _.filter(fs.readdirSync(`${__dirname}/commits`), (filename) => {
  return path.extname(filename) !== '.yml'
})

const stripErrors = (parseResult) => {
  return _.omit(parseResult, 'errors')
}

_.each(tests, (testName) => {
  const testCase = fs.readFileSync(`${__dirname}/commits/${testName}`, 'utf8')
  const expectedFile = fs.readFileSync(`${__dirname}/commits/${testName}.yml`,
    'utf8')
  const expected = yaml.safeLoad(expectedFile)
  const defaultConfig = readConfig(getDefaultConfigPath())

  // NOTE: this is done so we don't fail all the old footer tests, that we
  // added prior to this patch
  defaultConfig['valid-footer-tags'].push('A-footer', 'Footer')

  ava.test(testName, (test) => {
    if (expected.throws) {
      const error = test.throws(() => {
        parse(testCase, {
          config: defaultConfig
        })
      })
      console.log(testName)
      test.is(error.message, expected.throws)
    } else {
      const parseResult = parse(testCase, {
        config: defaultConfig
      })
      test.deepEqual(parseResult, stripErrors(expected))

      runRules(parseResult, defaultConfig, (errs) => {
        if (errs) {
          const errorMessages = _.map(errs, (err) => {
            return err.message
          })
          test.deepEqual(errorMessages, expected.errors)
        }
      })
    }
  })
})
