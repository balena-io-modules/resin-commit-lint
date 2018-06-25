#!/usr/bin/env node

const { parse } = require('./parser')
const _ = require('lodash')
const availableRules = require('./rules')
const capitano = require('capitano')
const fs = require('fs')
const path = require('path')
const errors = []

const parseRule = (command) => {
  return _.map(command.split('-'), (word, index) => {
    if (index !== 0) return word.charAt(0).toUpperCase().concat(word.slice(1));
    return word;
  }).join('')
}

const runRules = (commit, activeRules, done) => {
  _.forEach(activeRules, (rule) => {
    const parsedRule = parseRule(rule)
    if (!_.isFunction(availableRules[parsedRule])) {
      throw new Error(`No available rule matching ${rule}`)
    } else {
      try {
        availableRules[parsedRule](commit)
      } catch (err) {
        errors.push(err)
      }
    }
  })
  if (_.isEmpty(errors)) {
    done()
  } else {
    done(errors)
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
  let commit
  try {
    commit = parse(params['commit-message'])
  } catch (e) {
    generateErrorReport([e])
  }

  const activeRules = readConfig(options.config || path.join(__dirname, 'config.json'))
  return runRules(commit, activeRules, done)
}

capitano.command({
  signature: '<|commit-message>',
  description: 'Verifies the commit messagge according to the standard convention',
  options: [{
    signature: 'config',
    parameter: 'config',
    description: 'A path to a config file to override the default',
    alias: 'c',
  }],
  action: parseAndRun
})

generateErrorReport = (errors) => {
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