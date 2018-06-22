const _ = require('lodash')
const VERB_BLACKLIST = require('./utils/verb-blacklist').VERB_BLACKLIST

module.exports.titleMaxLength = (commit) => {
  if (commit.fullTitle.length > 72) {
    throw new Error('The commit title should not exceed 72 characters')
  }
}

module.exports.capitaliseSubject = (commit) => {
  if (commit.subject[0] != commit.subject[0].toUpperCase()) {
    throw new Error('The commit subject must start with a capital letter')
  }
}

module.exports.noPeriod = (commit) => {
  const len = commit.subject.length
  if (commit.subject[len - 1] === '.') {
    throw new Error('The commit title should not end with a period')
  }
}

module.exports.singleSpaceColon = (commit) => {
  if (/^\s+/.test(commit.subject[0])) {
    throw new Error('The commit title must include exactly one space after the colon')
  }
}

module.exports.imperativeMood = (commit) => {
  const firstWord = commit.subject.split(' ')[0]
  if (_.find(VERB_BLACKLIST, (word) => word == firstWord.toLowerCase())) {
    throw new Error('The commit subject must use the imperative mood')
  }
}