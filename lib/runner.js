const _ = require('lodash')
const availableRules = require('../rules')
const path = require('path')
const fs = require('fs')

module.exports.runRules = (commit, rulesConfig, done) => {
  const storedErrors = []

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

module.exports.readConfig = (configPath) => {
  const configFile = fs.readFileSync(configPath, 'utf8')
  return JSON.parse(configFile)
}

module.exports.getDefaultConfigPath = () => {
  return path.join(__dirname, '..', 'config.json')
}

const parseRule = (command) => {
  return _.map(command.split('-'), (word, index) => {
    if (index !== 0) return word.charAt(0).toUpperCase().concat(word.slice(1))
    return word
  }).join('')
}
