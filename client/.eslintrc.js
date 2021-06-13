module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
  globals: {
    React: 'writable',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
