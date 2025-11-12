// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'
// import { globalIgnores } from 'eslint/config'

// export default tseslint.config([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs['recommended-latest'],
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//   },
// ])
import js from '@eslint/js';
import globals from 'globals';
// import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import baseConfig from '@gravity-ui/eslint-config';
import prettierConfig from '@gravity-ui/eslint-config/prettier';

import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  { ignores: ['dist', 'eslint.config.js', 'vite.config.ts'] },
  {
    extends: [
      // js.configs.recommended,
      ...compat.extends('plugin:react/recommended'),
      ...compat.extends('plugin:import/recommended'),
      ...compat.extends('airbnb'),
      ...tseslint.configs.recommended,
      // ...baseConfig,
      // ...prettierConfig,
    ],
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      // 'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
      quotes: ['error', 'single'],
      'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'import/no-unresolved': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
      'import/extensions': 'off',
      // 'eslint-disable-next-line prettier/prettier': 'off',
    },
    'settings': {
      'import/core-modules': [
        '@gravity-ui/icons',
      ]
    }
  },
);
