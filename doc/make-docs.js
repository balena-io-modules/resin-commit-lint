const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs')
const _ = require('lodash')

const template = fs.readFileSync(__dirname + '/../doc/README.hbs', 'utf8')
const defaultConfig = require(__dirname + '/../config.json')

const findRuleDefault = (rule) => {
  if (_.isUndefined(defaultConfig[rule])) {
    throw new Error('Could not match rule identifier and config')
  }
  return defaultConfig[rule]
}
const templateData = jsdoc2md.getTemplateDataSync({
  files: __dirname + '/../lib/errors.js'
}).map((tpData) => {
  tpData.default = findRuleDefault(tpData.id)
  return tpData
})

const readme = jsdoc2md.renderSync({
  data: templateData,
  template: template
})

fs.writeFileSync(__dirname + '/../README.md', readme)