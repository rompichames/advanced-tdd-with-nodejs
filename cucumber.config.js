export default {
  paths: ['tests/bdd/features/**/*.feature'],
  import: ['tests/bdd/dist/**/*.js'],
  format: [
    'progress-bar',
    'html:reports/cucumber-report.html',
    'json:reports/cucumber-report.json',
    'junit:reports/cucumber-report.xml'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  publishQuiet: true,
  dryRun: false,
  failFast: false,
  strict: false,
  parallel: 1
};
