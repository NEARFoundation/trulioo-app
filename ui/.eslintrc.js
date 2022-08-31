// TODO: Discuss whether our shared Eslint rules should be updated such that we won't need to define these overrides.

/* eslint-env node */

module.exports = {
  // TODO: Shouldn't 'plugin:react/recommended' already be part of eslint-config-near?
  extends: ['near', 'plugin:react/recommended'], // See https://github.com/NEAR-Edu/eslint-config-near/blob/main/package.json
  globals: {
    console: true,
    document: true,
    process: true,
    window: true,
  },
  rules: {
    'canonical/sort-keys': 'off',
    'jsonc/sort-keys': 'off',
    'no-console': 'off',
  },
};
