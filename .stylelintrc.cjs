module.exports = {
  extends: ['stylelint-config-standard-scss'],
  customSyntax: 'postcss-sass',
  rules: {
    indentation: 2,
    'no-missing-end-of-source-newline': true,
    'color-named': 'never',
    'selector-max-id': 0,
    'max-nesting-depth': 4,
    'rule-empty-line-before': ['always-multi-line', { ignore: ['after-comment', 'inside-block'] }],
    'scss/at-extend-no-missing-placeholder': true,
    'scss/dollar-variable-pattern': '^[_a-z0-9-]+$',
    'scss/percent-placeholder-pattern': '^[_a-z0-9-]+$',
  },
  overrides: [
    {
      files: ['**/*.scss'],
      rules: {},
    },
  ],
  ignoreFiles: ['**/dist/**', '**/build/**', '**/node_modules/**'],
};
