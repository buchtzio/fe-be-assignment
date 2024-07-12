module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', 
    'plugin:react/recommended',
    'plugin:react-hooks/recommended', 
    'plugin:prettier/recommended' 
  ],
  parserOptions: {
    ecmaVersion: 2020, 
    sourceType: 'module', 
    ecmaFeatures: {
      jsx: true 
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'react/prop-types': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
