module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  rules: {
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'no-return-assign': 'off',
    'no-param-reassign': ['error', { props: false }],
    'react/jsx-filename-extension': 'off',
    'react/require-default-props': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
}
