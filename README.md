# resin-commit-lint

A script to lint commit messages according to the rules defined in https://docs.google.com/document/d/1Lip9ZwMx5K-9k6-QFCeAu3tfDwR431fGtmTwq8bnC2o

# Usage
Takes the commit message as input and validates it according to the rules, you can pipe the input directly from `git show`.

```
git show $SHA -s --format=%B | resin-commit-lint
```