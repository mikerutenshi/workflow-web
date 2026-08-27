import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Prisma generates this client; it is not ours to lint or format.
  { ignores: ['src/generated/**', 'dist/**'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  prettierRecommended,
  {
    // The repo mixes CRLF and LF files. eslint-plugin-prettier does not pick up
    // endOfLine from .prettierrc, so without this it reports every CRLF file as
    // needing its line endings rewritten.
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      // Pre-existing backlog from before ESLint ever ran here: warn so the count
      // stays visible without blocking the build. Burn these down separately.
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]);
