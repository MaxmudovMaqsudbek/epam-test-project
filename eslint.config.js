import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default defineConfig([
    js.configs.recommended,
    {
        ignores: ['reports/**', 'allure-report/**'],
    },
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.mocha,
                browser: 'readonly',
                expect: 'readonly',
                $: 'readonly',
                $$: 'readonly',
                describe: 'readonly',
                it: 'readonly',
            },
        },
    },
    {
        files: ['./test/specs/**/*.js', './test/api/**/*.js'],
        plugins: {
            js,
        },
        extends: ['js/recommended'],
        rules: {
            ...prettier.rules,
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
        },
    },
]);
