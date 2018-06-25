const _ = require('lodash')
const peg = require('pegjs')
const fs = require('fs')
const path = require('path')
const grammar = fs.readFileSync(path.join(__dirname, './grammar.pegjs'), 'utf8')

// Workaround until pegjs is updated to ^0.11.0.
// See https://github.com/pegjs/pegjs/issues/517
const generateWithContext = (grammar, options) => {
  let parser = peg.generate(grammar, options)
  let parse = parser.parse
  parser.parse = (input, opts) => {
    return parse(input, _.merge({}, opts, options.defaultParseOptions || {}))
  }
  return parser
}

const parser = generateWithContext(grammar, { defaultParseOptions: { _ } })

module.exports.parse = parser.parse
