{ const { _ }  = options }
CommitMessage
  = title:Title '\n' message:Message {
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
  = prefix:Prefix Colon _ subject:Subject {
    return {
      prefix: prefix,
        subject: subject,
        fullTitle: prefix + ': ' + subject
    };
  }

Message "Message"
  = b:Body {
    const lines = b.split('\n')
    const footerStart = lines.lastIndexOf('')
    if (footerStart == -1) {
      throw new Error('Could not parse commit: footers are mandatory and should be separated from the body with a newline')
    }
    const body = lines.slice(0, footerStart).join('\n')
    const footers = lines.slice(footerStart + 1)
    return {
     body: body,
     footers: footers,
     message: body + '\n\n' + footers.join('\n')
    }
  }

Prefix "Prefix"
  = prefix:[^: \n\t\r]+ {
    return prefix.join('')
  }

Colon ":"
  = ':'

Subject "Subject"
  = subj:([^\n]+) {
    return subj.join('')
  }


Body "Body"
  = body:.+ {
    return _.trimEnd(body.join(''))
  }

_ "Space"
  = ' '