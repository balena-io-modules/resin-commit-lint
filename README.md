# resin-commit-lint

A script to lint commit messages.
A valid commit starts with the title, which is made of an optional prefix, separated from the subject by a colon.
The body, which may contain a detailed description of your changes, should be separated from the title by an empty line.
Footers may appear at the end of the commit, separated from the body by a newline.

Scroll to the Rules sections to learn about the specific rules, the default
configuration can be found [here](https://github.com/resin-io/resin-commit-lint/blob/master/config.json)


## Examples

```
prefix: Subject

A body which may contain several paragraphs.

It must contain footers separated by a newline

Change-type: major
Signed-off-by: Foo Bar <foobar@resin.io>
```

Since the prefix is optional the following is also a valid commit

```
subject without prefix

A body

Change-type: minor
Signed-off-by: Foo Bar <foobar@resin.io>
```

# Usage
Takes the commit message as input and validates it according to the rules.

```
commit=$(git show $SHA -s --format=%B)
resin-commit-lint "${commit}"
```

You can override the [default configuration](https://github.com/resin-io/resin-commit-lint/blob/master/config.json) with the `-c` option

# Tips
You can configure `git` to help you follow these guidelines by creating a commit
template. To enable this, simply add this to you `.gitconfig`

```
[commit]
  template = path/to/your/template
```

You can customise your template according to your own needs, here is an example
which you can use to build on:
```
prefix: Subject

Commit body

Change-type: patch|minor|major
Signed-off-by: Your Name <yourname@resin.io>
```
# Rules

## body-lines-max-length
*Default: false*

No line in the body should exceed 72 character.
If a line contains a URL, the characters in the URL do not
count towards the allowed maximum.

## capitalise-subject
*Default: false*

The commit subject must start with a capital letter

Accepts the following values:
- *never*: Rule is never applied
- *always*: Rule is always applied
- *with-prefix*: Rule is only applied if a prefix is found

## change-type
*Default: false*

Each commit must contain the following footer: Change-type: patch|minor|major  
The meanings of patch, minor and major follow the [Semantic Versioning spec](https://semver.org/)
and this definition may be used to automatically update the version in the CHANGELOG file.

## change-type-fixed-spelling
*Default: false*

Change-type should follow this exact format (case-sensitive): Change-type: patch|minor|major

## imperative-mood
*Default: false*

The commit subject must use the imperative mood

## no-leading-space-in-subject
*Default: true*

The commit subject must not start with a leading space.
Note that if a prefix is supplied a space is expected between the colon and the title

Accepts:

```
prefix: subject
```
```
subject
```

Rejects:

```
prefix:  subject
```
```
 subject
```

## no-period
*Default: false*

The commit title should not end with a period

## no-tag-in-body
*Default: true*

Commit body should not contain footer tags.
This error might also be caused if the first line of the footer is not a tag.
Refer to [pretty-tags](#pretty-tags) rule for tag formatting.

## no-whitespace-in-prefix
*Default: false*

Prefix should not contain any whitespace

## pretty-tags
*Default: true*

Tag names must start with a capital letter, only letters and '-' are allowed

## proper-paragraphs
*Default: false*

The first letter of any paragraph should be capitalised

## signature-last
*Default: false*

Signed-off-by must be the last tag appearing in the footers

## signed-off-commits
*Default: false*

Each commit must contain the following footer: Signed-off-by: Full Name <email\>  
By signing off a commit, a developer is certifying the statements of the
[Developer Certificate of Origin](https://developercertificate.org/) to the extent that
it is applicable (for example, a contribution to an open source project or package).

## title-max-length
*Default: false*

The commit title should not exceed 72 characters

