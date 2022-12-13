module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]+$',
      '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',
    ],
  },
}
