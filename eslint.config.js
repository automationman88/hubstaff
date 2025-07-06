import typescript from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

const { configs: typescriptConfigs } = typescript;

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescript,
      playwright: playwright,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    ignores: [
      'node_modules/',
      '.idea/',
      'playwright-report',
      'target',
      'test-results',
      'base_user.json',
    ],
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'off',
      'playwright/no-skipped-test': 'off',
      'no-console': 'error',
      'playwright/no-standalone-expect': 'off',
      'playwright/no-conditional-in-test': 'off',
      // Strict Rules
      eqeqeq: 'error',
      curly: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      // Stylistic Rules
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      // Additional Recommended Rules
      '@typescript-eslint/no-unused-vars': 'error',
      'no-undef': 'error',
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'no-mixed-spaces-and-tabs': 'error',
      'space-before-blocks': 'error',
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-infix-ops': 'error',
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
];
