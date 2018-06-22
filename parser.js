const _ = require('lodash')

const parse = (commitMessage) => {
  if (typeof commitMessage !== 'string') {
    throw new TypeError('`commitMessage` should be a string')
  }

  const lines = commitMessage.trim().split('\n')
  const fullTitle = lines.shift()
  const footerStart = lines.lastIndexOf('')
  if (footerStart == -1) {
    throw new Error('Could not parse commit: footers are mandatory and should be separated from the body with a newline')
  }
  const body = lines.slice(0, footerStart).join('\n')
  const footers = lines.slice(footerStart + 1)
  const parts = /^(\S+): (.+)$/.exec(fullTitle)
  const message = body + '\n\n' + footers.join('\n')
  if (!parts) {
    throw new Error('Invalid commit title: <prefix>: <subject>')
  }

  const [prefix, subject] = parts.slice(1)

  const commit = {
    prefix,
    subject,
    fullTitle,
    body,
    footers,
    message
  }

  return commit
}

module.exports = { parse }
