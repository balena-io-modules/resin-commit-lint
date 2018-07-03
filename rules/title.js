const _ = require('lodash')
const VERB_BLACKLIST = require('./utils/verb-blacklist').VERB_BLACKLIST
const {
  TITLE_MAX_LENGTH,
  CAPITALISE_SUBJECT,
  NO_PERIOD,
  SINGLE_SPACE_COLON,
  IMPERATIVE_MOOD
} = require('../lib/errors')

module.exports.titleMaxLength = (commit) => {
  if (commit.fullTitle.length > 72) {
    throw TITLE_MAX_LENGTH
  }
}

module.exports.capitaliseSubject = (commit) => {
  if (commit.subject[0] !== commit.subject[0].toUpperCase()) {
    throw CAPITALISE_SUBJECT
  }
}

module.exports.noPeriod = (commit) => {
  const len = commit.subject.length
  if (commit.subject[len - 1] === '.') {
    throw NO_PERIOD
  }
}

module.exports.singleSpaceColon = (commit) => {
  if (/^\s+/.test(commit.subject[0])) {
    throw SINGLE_SPACE_COLON
  }
}

module.exports.imperativeMood = (commit) => {
  const firstWord = commit.subject.split(' ')[0]
  if (_.find(VERB_BLACKLIST, (word) => word === firstWord.toLowerCase())) {
    throw IMPERATIVE_MOOD
  }
}
