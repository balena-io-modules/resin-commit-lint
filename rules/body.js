const _ = require('lodash')
const {
  BODY_LINES_MAX_LENGTH,
  NO_TAG_IN_BODY,
  PROPER_PARAGRAPHS,
  PRETTY_TAGS,
  CHANGE_TYPE,
  SIGNED_COMMITS,
  SIGNATURE_LAST,
  CHANGE_TYPE_FIXED_SPELLING
} = require('../lib/errors')

const FOOTER_REGEX = /^([A-Z](\w|-)*): (.+)$/

module.exports.bodyLinesMaxLength = (commit) => {
  _.map(commit.body.split('\n'), (line) => {
    if (line.length > 72) {
      throw BODY_LINES_MAX_LENGTH
    }
  })
}

module.exports.noTagInBody = (commit) => {
  const bodyLines = commit.body.split('\n')
  _.map(bodyLines, (line) => {
    if (FOOTER_REGEX.test(line)) {
      throw NO_TAG_IN_BODY
    }
  })
}

module.exports.properParagraphs = (commit) => {
  if (/\n(\n)+(\s)*[a-z]/g.test(commit.body)) {
    throw PROPER_PARAGRAPHS
  }
}

module.exports.prettyTags = (commit) => {
  _.map(commit.footers, (footer) => {
    if (!FOOTER_REGEX.test(footer)) {
      throw PRETTY_TAGS(footer)
    }
  })
}

module.exports.changeType = (commit) => {
  const changeTypeFooter = _.find(commit.footers, (footer) => {
    return /^Change-type: (patch|minor|major)$/.test(footer)
  })
  if (!changeTypeFooter) {
    throw CHANGE_TYPE
  }
}

module.exports.signedCommits = (commit) => {
  const signedOffByFooter = _.find(commit.footers, (footer) => {
    return /^Signed-off-by: (.+) <(.+)>$/.test(footer)
  })
  if (!signedOffByFooter) {
    throw SIGNED_COMMITS
  }
}

module.exports.signatureLast = (commit) => {
  const signatureIndex = _.findIndex(commit.footers, (footer) => {
    return /^Signed-off-by: (.+) <(.+)>$/.test(footer)
  })
  if (signatureIndex === -1 || signatureIndex !== (commit.footers.length - 1)) {
    throw SIGNATURE_LAST
  }
}

module.exports.changeTypeFixedSpelling = (commit) => {
  const changeTypeFooter = _.find(commit.footers, (footer) => {
    return /^Change-type:.+$/i.test(footer)
  })

  if (changeTypeFooter) {
    if (!(/^Change-type: (patch|minor|major)$/.test(changeTypeFooter))) {
      throw CHANGE_TYPE_FIXED_SPELLING
    }
  }
}
