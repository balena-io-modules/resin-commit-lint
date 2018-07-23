#!/usr/bin/env node

const {
  parse
} = require('./lib/parser')
const _ = require('lodash')
const availableRules = require('./rules')
const capitano = require('capitano')
const fs = require('fs')
const path = require('path')
const storedErrors = []

const parseRule = (command) => {
  return _.map(command.split('-'), (word, index) => {
    if (index !== 0) return word.charAt(0).toUpperCase().concat(word.slice(1))
    return word
  }).join('')
}

const runRules = (commit, rulesConfig, done) => {
  _.forEach(rulesConfig, (configuration, rule) => {
    // Return early if rule is not active
    if (!configuration) return

    const parsedRule = parseRule(rule)
    if (_.isFunction(availableRules[parsedRule])) {
      try {
        availableRules[parsedRule](commit, configuration)
      } catch (err) {
        storedErrors.push(err)
      }
    } else {
      throw new Error(`No available rule matching ${rule}`)
    }
  })
  if (_.isEmpty(storedErrors)) {
    done()
  } else {
    done(storedErrors)
  }
}

const readConfig = (configPath) => {
  const configFile = fs.readFileSync(configPath, 'utf8')
  const config = JSON.parse(configFile)

  return _.reduce(config, (acc, val, key) => {
    if (val === true) {
      acc.push(key)
    }
    return acc
  }, [])
}

const parseAndRun = (params, options, done) => {
  let commit = {}
  try {
    commit = parse(params['commit-message'])
  } catch (err) {
    return generateErrorReport([ err ])
  }

  const configPath = path.join(__dirname, 'config.json')
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
