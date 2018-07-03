# resin-commit-lint

A script to lint commit messages according to the rules defined in https://docs.google.com/document/d/1Lip9ZwMx5K-9k6-QFCeAu3tfDwR431fGtmTwq8bnC2o

# Usage
Takes the commit message as input and validates it according to the rules, you can pipe the input directly from `git show`.

```
git show $SHA -s --format=%B | resin-commit-lint
```

You can override the [default configuration](https://github.com/resin-io/resin-commit-lint/blob/master/config.json) with the `-c` option

# Rules

### body-lines-max-length
No line in the body should exceed 72 character

### no-tag-in-body
Commit body should not contain footer tags

### proper-paragraphs
The first letter of any paragraph should be capitalised

### change-type
Each commit must contain the following footer: Change-type: patch|minor|major

### signed-off
Each commit must contain the following footer: Signed-off-by: Full Name &lt;email&gt;

### signature-last
Signed-off-by must be the last tag appearing in the footers

### title-max-length
The commit title should not exceed 72 characters

### capitalise-subject
The commit subject must start with a capital letter

### no-period
The commit title should not end with a period

### single-space-colon
The commit title must include exactly one space after the colon

### imperative-mood
The commit subject must use the imperative mood

### pretty-tags
Tag names must start with a capital letter, only letters and &#x27;-&#x27; are allowed

