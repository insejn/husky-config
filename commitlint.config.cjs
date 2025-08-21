// commitlint.config.cjs
let chalk;
(async () => {
  chalk = (await import('chalk')).default;
})();

const JIRA_ID = '[A-Z][A-Z0-9]+-\\d+';

// feat: [ID] msg  | feat: [ID][ID] msg
const FEAT_RE = new RegExp(
  `^feat(?:\\([^()\\r\\n]+\\))?: \\[${JIRA_ID}\\](?:\\[${JIRA_ID}\\])? .+`
);

// fix: [ID][ID] msg
const FIX_RE = new RegExp(
  `^fix(?:\\([^()\\r\\n]+\\))?: \\[${JIRA_ID}\\]\\[${JIRA_ID}\\] .+`
);

module.exports = {
  extends: ['@commitlint/config-conventional'],

  ignores: [
    (msg) =>
      /^Merge /.test(msg) ||
      /^Revert "/.test(msg) ||
      /^chore\(release\):/.test(msg)
  ],

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'hotfix',
        'release',
        'chore',
        'refactor',
        'docs',
        'style',
        'test',
        'perf',
        'build',
        'ci',
        'revert',
        'merge'
      ]
    ],
    'subject-empty': [2, 'never'],
    'header-max-length': [0],
    'jira-format-for-feat-fix': [2, 'always'],
  },

  plugins: [
    {
      rules: {
        'jira-format-for-feat-fix': ({ header, type }) => {
          if (!chalk) {
            // fallback gdy chalk nie zdąży się załadować
            chalk = { red: s=>s, yellow:s=>s, green:s=>s, cyan:s=>s, bold:s=>s };
          }

          if (!header || !header.trim()) {
            return [false, chalk.red.bold('❌ Commit message header is empty.')];
          }

          if (type === 'feat') {
            const ok = FEAT_RE.test(header);
            return [
              ok,
              chalk.red.bold('❌ Wrong feat format!\n') +
              chalk.yellow('Expected one of:\n') +
              chalk.green.bold(' feat') +
              chalk.cyan('(scope?): ') +
              chalk.blue.italic(' [PROJECT-123] ') +
              chalk.gray.italic('Your message\n') +
              chalk.green.bold('  feat') +
              chalk.cyan('(scope?): ') +
              chalk.blue.italic(' [PROJECT-123]') +
              chalk.yellow.italic('[PROJECT-456] ') +
              chalk.gray.italic('Your message\n') +
              chalk.white.bold(`\nYour commit looks bad :(\n`) +
              chalk.white(`${header}`)
            ];
          }

          if (type === 'fix') {
            const ok = FIX_RE.test(header);
            return [
              ok,
              chalk.red.bold('❌ Wrong fix format!\n') +
              chalk.yellow('Expected:\n') +
              chalk.green.bold('fix(scope?): [PARENT-123][PROJECT-456] ') +
              chalk.gray.bold('Your message\n') +
              chalk.white.bold(`\nYour commit looks bad :(:\n`)  +
              chalk.white(`${header}`)
            ];
          }

          return [true, ''];
        },
      },
    },
  ],
};