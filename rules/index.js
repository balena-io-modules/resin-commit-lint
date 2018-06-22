const _ = require('lodash')
const bodyRules = require('./body')
const titleRules = require('./title')

module.exports = _.merge({}, bodyRules, titleRules)
