/* eslint-env node */

module.exports = {
  extends: ['near'], // See https://github.com/NEAR-Edu/eslint-config-near/blob/main/package.json
  globals: {
    console: true,
    process: true,
    window: true,
  },
  rules: {
    'canonical/sort-keys': 'off',
    'no-console': 'off',
  },
};
