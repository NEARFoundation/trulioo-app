// TODO: Discuss whether our shared Eslint rules should be updated such that we won't need to define these overrides.

// eslint-disable-next-line no-undef
module.exports = {
  extends: ['near'], // See https://github.com/NEAR-Edu/eslint-config-near/blob/main/package.json
  globals: {
    console: true,
    process: true,
  },
  rules: {
    'canonical/sort-keys': 'off',
    'no-console': 'off',
    'consistent-return': 'off',
    'func-style': 'off',
  },
};
