{ const { _ }  = options }
CommitMessage
  = title:Title Newline message:Message {
   return {
      prefix: title.prefix,
      subject: title.subject,
      fullTitle: title.fullTitle,
      body: message.body,
      footers: message.footers,
      message: message.message
    };
  }

Title
  = prefix:Prefix? subject:Subject {
    let delimiter = ': '
    if (!prefix) {
      prefix    = ''
      delimiter = ''
    }
    return {
      prefix: prefix,
      subject: subject,
      fullTitle: prefix + delimiter + subject
    };
  }

Newline "newline between title and body"
  = '\n'

Message "body and footers"
  = b:Body {
    const lines = b.split('\n')
    // footers start at the last empty line in the body
    const footerStart = lines.lastIndexOf('')
    if (footerStart == -1) {
      throw new Error('Could not parse commit: footers are mandatory and should be separated from the body with a newline')
    }
    const body = lines.slice(0, footerStart).join('\n')
    let spacing = '\n'
    // if the body is non-empty add an extra newline to reconstruct the message
    if (body !== '') {
      spacing = spacing + '\n'
    }
    const footers = lines.slice(footerStart + 1)
    return {
     body: body,
     footers: footers,
     message: body + spacing + footers.join('\n')
    }
  }

Prefix "prefix"
  = prefix:[^: \n\t\r]+ extraSpaces:_* Colon _ {
    if (extraSpaces) {
      prefix = prefix.concat(extraSpaces)
    }
    return prefix.join('')
  }

Colon ": between prefix and subject in commit title"
  = ':'

Subject "subject"
  = subj:([^:][^\n]+) {
    return subj[0] + subj[1].join('')
  }


Body "body"
  = body:.+ {
    return _.trimEnd(body.join(''))
  }

_ "space"
  = ' '
