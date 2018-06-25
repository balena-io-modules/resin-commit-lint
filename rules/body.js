const _ = require('lodash')

const FOOTER_REGEX = /^([A-Z](\w|-)*): (.+)$/

module.exports.bodyLinesMaxLength = (commit) => {
  _.map(commit.message.split('\n'), (line) => {
    if (line.length > 72) {
      throw new Error('No line in the body should exceede 72 characters')
    }
  })
}

module.exports.noTagInBody = (commit) => {
  bodyLines = commit.body.split('\n')
  _.map(bodyLines, (line) => {
    if (FOOTER_REGEX.test(line)) {
      throw new Error('Commit body shoud not contain footer tags')
    }
  })
}

module.exports.properParagraphs = (commit) => {
  if (/\n(\n)+(\s)*[a-z]/g.test(commit.body)) {
    throw new Error('The first letter of any paragraph should be capitalised')
  }
}

module.exports.prettyTags = (commit) => {
  _.map(commit.footers, (footer) => {
    if (!FOOTER_REGEX.test(footer)) {
      throw new Error(`Invalid footer found:\n${footer}\nCommit tags should` +
        `have the following format: [tag-name]: [tag-content]` +
        `Tag names must start with a capital letter, only letters and '-' are allowed`)
    }
    if (footer[0] != footer[0].toUpperCase()) {
      throw new Error('Commit tags should start with a capital letter')
    }
  })
}

module.exports.changeType = (commit) => {
  const changeTypeFooter = _.find(commit.footers, (footer) => {
    return /^Change-type: (patch|minor|major)$/.test(footer)
  })
  if (!changeTypeFooter) {
    throw new Error('Each commit must contain the following footer: Change-type: patch|minor|major')
  }
}

module.exports.signedCommits = (commit) => {
  const signedOffByFooter = _.find(commit.footers, (footer) => {
    return /^Signed-off-by: (.+) <(.+)>$/.test(footer)
  })
  if (!signedOffByFooter) {
    throw new Error('Each commit must contain the following footer: Signed-off-by: Full Name <email>')
  }
  if (signedOffByFooter != _.last(commit.footers)) {
    throw new Error('Signed-off-by should be the last footer appearing in every commit')
  }
}