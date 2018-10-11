/* eslint max-len: 0 */
/* Disable eslint no-trailing-spaces because Markdown uses 2 trailing spaces to indicate a line break */
/* eslint-disable no-trailing-spaces */

/**
* @name body-lines-max-length
* @description
* No line in the body should exceed 72 character.
* If a line contains a URL, the characters in the URL do not
* count towards the allowed maximum.
* @const
* @public
*/
module.exports.BODY_LINES_MAX_LENGTH = Error('No line in the body should exceed 72 characters')

/**
* @name no-tag-in-body
* @description Commit body should not contain footer tags
* @const
* @public
*/
module.exports.NO_TAG_IN_BODY = Error('Commit body should not contain footer tags')

/**
* @name no-whitespace-in-prefix
* @description Prefix should not contain any whitespace
* @const
* @public
*/
module.exports.NO_WHITESPACE_IN_PREFIX = Error('Prefix should not contain any whitespace')

/**
* @name proper-paragraphs
* @description The first letter of any paragraph should be capitalised
* @const
* @public
*/
module.exports.PROPER_PARAGRAPHS = Error('The first letter of any paragraph should be capitalised')

/**
* @name pretty-tags
* @description Tag names must start with a capital letter, only letters and '-' are allowed
* @function
* @public
*
* @param {String} tag - Invalid tag
* @returns {Error}
*/
module.exports.PRETTY_TAGS = (tag) => {
  return Error(`Invalid footer tag found: ${tag}\n` +
  'Footer tags should have the following format: [tag-name]: [tag-value]\n' +
  'Tag names must start with a capital letter, only letters and - are allowed')
}

/**
* @name change-type
* @description Each commit must contain the following footer: Change-type: patch|minor|major  
* The meanings of patch, minor and major follow the [Semantic Versioning spec](https://semver.org/)
* and this definition may be used to automatically update the version in the CHANGELOG file.
* @const
* @public
*/
module.exports.CHANGE_TYPE = Error('Each commit must contain the following footer: Change-type: patch|minor|major')

/**
* @name change-type-fixed-spelling
* @description Change-type should follow this exact format (case-sensitive): Change-type: patch|minor|major
* @const
* @public
*/
module.exports.CHANGE_TYPE_FIXED_SPELLING = Error('Change-type should follow this exact format (case-sensitive): Change-type: patch|minor|major')

/**
* @name signed-off-commits
* @description Each commit must contain the following footer: Signed-off-by: Full Name <email\>  
* By signing off a commit, a developer is certifying the statements of the
* [Developer Certificate of Origin](https://developercertificate.org/) to the extent that
* it is applicable (for example, a contribution to an open source project or package).
* @const
* @public
*/
module.exports.SIGNED_OFF_COMMITS = Error('Each commit must contain the following footer: Signed-off-by: Full Name <email>')

/**
* @name signature-last
* @description Signed-off-by must be the last tag appearing in the footers
* @const
* @public
*/
module.exports.SIGNATURE_LAST = Error('Signed-off-by must be the last tag appearing in the footers')

/**
* @name title-max-length
* @description The commit title should not exceed 72 characters
* @const
* @public
*/
module.exports.TITLE_MAX_LENGTH = Error('The commit title should not exceed 72 characters')

/**
* @name capitalise-subject
* @description
* The commit subject must start with a capital letter
*
* Accepts the following values:
* - *never*: Rule is never applied
* - *always*: Rule is always applied
* - *with-prefix*: Rule is only applied if a prefix is found
* @const
* @public
*/
module.exports.CAPITALISE_SUBJECT = Error('The commit subject must start with a capital letter')

/**
* @name no-period
* @description The commit title should not end with a period
* @const
* @public
*/
module.exports.NO_PERIOD = Error('The commit title should not end with a period')

/**
* @name no-leading-space-in-subject
* @description
* The commit subject must not start with a leading space.
* Note that if a prefix is supplied a space is expected between the colon and the title
*
* Accepts:
*
* ```
* prefix: subject
* ```
* ```
* subject
* ```
*
* Rejects:
*
* ```
* prefix:  subject
* ```
* ```
*  subject
* ```
*
* @const
* @public
*/
module.exports.NO_LEADING_SPACE_IN_SUBJECT = Error('The commit subject must not start with a leading space')

/**
* @name imperative-mood
* @description The commit subject must use the imperative mood
* @const
* @public
*/
module.exports.IMPERATIVE_MOOD = Error('The commit subject must use the imperative mood')
