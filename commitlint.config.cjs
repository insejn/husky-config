/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(msg) => /^Merge /.test(msg) || /^release(\(.+\))?:/i.test(msg) || /^chore\(release\):/i.test(msg)],

  rules: {
    // Dozwolone typy
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'build', 'ci', 'revert', 'release'],
    ],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 120],
    'scope-empty': [0, 'never'],
    'feat-fix-must-have-jira': [2, 'always'],
  },

  plugins: [
    {
      rules: {
        'feat-fix-must-have-jira': ({ header, type }) => {
          const h = header || '';
          const re =
            /^(feat|fix)(\([^)]+\))?:\s\[[A-Z][A-Z0-9]+-\d+\](\[[A-Z][A-Z0-9]+-\d+\])?\s.+/;
          if (type === 'feat' || type === 'fix') {
            const pass = re.test(h);
            return pass
              ? [true]
              : [
                  false,
                  'Dla typów "feat" i "fix" użyj: type(scope): [PROJ-123] opis lub type(scope): [PROJ-123][PROJ-456] opis',
                ];
          }
          return [true];
        },
      },
    },
  ],
};