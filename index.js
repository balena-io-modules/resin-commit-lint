#!/usr/bin/env node

const _ = require('lodash')
const capitano = require('capitano')

const {
  parse
} = require('./lib/parser')
const {
  runRules,
  readConfig,
  getDefaultConfigPath
} = require('./lib/runner')

const parseAndRun = (params, options, done) => {
  let commit = {}
  try {
    commit = parse(params['commit-message'], options)
  } catch (err) {
    return done([ err ])
  }

  const configPath = getDefaultConfigPath()
  const rulesConfig = readConfig(options.config || configPath)
  return runRules(commit, rulesConfig, done)
}

capitano.command({
  signature: '<commit-message>',
  // eslint-disable-next-line max-len
  description: 'Verifies the commit messagge according to the standard convention',
  options: [ {
    signature: 'config',
    parameter: 'config',
    description: 'A path to a config file to override the default',
    alias: 'c'
  } ],
  action: parseAndRun
})

const generateErrorReport = (errors) => {
  console.error('Found the following errors:\n')
  _.forEach(errors, (error) => {
    console.error('Error:', error.message)
  })
  process.exit(1)
}

capitano.run(process.argv, (error) => {
  if (error) {
    generateErrorReport(error)
  } else {
    console.log('Valid')
  }
})
