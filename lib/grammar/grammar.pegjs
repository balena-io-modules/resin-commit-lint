{
	const { _, config } = options
	const validFooterTags = config['valid-footer-tags'] || []
}

CommitMessage
	= title:Title Newline? message:Message? Newline? {
		if (!message) {
			return {
				prefix: title.prefix,
				subject: title.subject,
				fullTitle: title.fullTitle,
				body: '',
				footers: [],
				message: ''
			}
		}
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
			prefix = ''
			delimiter = ''
		}
		return {
			prefix: prefix,
			subject: subject,
			fullTitle: prefix + delimiter + subject
		};
	}

Newline "newline"
	= '\n' / '\r\n' / '\r'

Message "body and footers"
	= body:Body? footers:Footers? {
		return {
			body,
			footers: footers || [],
			message: body + (body && footers ? '\n\n' : '') + (footers ? footers.join('\n') : '')
		}
	}

Prefix "prefix"
	= prefix:$[^: \n\t\r]+ extraSpaces:$_* Colon _ {
		if (extraSpaces) {
			prefix = prefix + extraSpaces
		}
		return prefix
	}

Subject "subject"
	= $(notEOL+)

Body "body"
	= body:$(
		!Footers
		(notEOL* Newline / notEOL+)
	)* {
		return _.trim(body.replace(/\r/g, ''), '\n')
	}

Footers "footers" =
	fs:(Newline x:Footer {return x})+ Newline? {
		return _.compact(fs)
	}

Footer "footer" =
	('(cherry picked from commit ' notEOL+ {}) /
	$(tag:([a-zA-Z\-]+ Colon _ notEOL+) & {
		return validFooterTags.some((valid) => {
			return (new RegExp(valid)).test(_.flatten(tag).join(''))
		})
	})

notEOL = [^\r\n]

_ "space"
	= ' '

Colon ": between prefix and subject in commit title"
	= ':'
