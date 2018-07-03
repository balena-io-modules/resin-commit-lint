const _ = require('lodash')
const peg = require('pegjs')
const fs = require('fs')
const path = require('path')
const grammarPath = path.join(__dirname, './grammar/grammar.pegjs')
const parserGrammar = fs.readFileSync(grammarPath, 'utf8')

// Workaround until pegjs is updated to ^0.11.0.
// See https://github.com/pegjs/pegjs/issues/517
const generateWithContext = (grammar, options) => {
  const parser = peg.generate(grammar, options)
  const parse = parser.parse
  parser.parse = (input, opts) => {
    return parse(input, _.merge({}, opts, options.defaultParseOptions || {}))
  }
  return parser
}

const parser = generateWithContext(parserGrammar, {
  defaultParseOptions: {
    _
  }
})

module.exports.parse = parser.parse
