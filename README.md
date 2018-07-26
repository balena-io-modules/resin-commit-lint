# resin-commit-lint

A script to lint commit messages.
A valid commit starts with the title, which is made of an optional prefix,
separated from the subject by a colon; the next lines may contain the body of
the commit followed by the footers.

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
*Default: true*

No line in the body should exceed 72 character

## no-tag-in-body
*Default: true*

Commit body should not contain footer tags

## no-whitespace-in-prefix
*Default: true*

Prefix should not contain any whitespace

## proper-paragraphs
*Default: true*

The first letter of any paragraph should be capitalised

## change-type
*Default: false*

Each commit must contain the following footer: Change-type: patch|minor|major

## change-type-fixed-spelling
*Default: true*

Change-type should follow this exact format (case-sensitive): Change-type: patch|minor|major

## signed-commits
*Default: true*

Each commit must contain the following footer: Signed-off-by: Full Name <email\>

## signature-last
*Default: true*

Signed-off-by must be the last tag appearing in the footers

## title-max-length
*Default: true*

The commit title should not exceed 72 characters

## capitalise-subject
*Default: with-prefix*

The commit subject must start with a capital letter

Accepts the following values:
- *never*: Rule is never applied
- *always*: Rule is always applied
- *with-prefix*: Rule is only applied if a prefix is found

## no-period
*Default: true*

The commit title should not end with a period

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

## imperative-mood
*Default: true*

The commit subject must use the imperative mood

## pretty-tags
*Default: true*

Tag names must start with a capital letter, only letters and '-' are allowed

