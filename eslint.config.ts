import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist', 'node_modules', 'src/tests'],
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
            },
            globals: globals.browser,
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier,
            unicorn,
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...unicorn.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'prettier/prettier': ['warn', { tabWidth: 4, singleQuote: true }],
            'import/order': 'off',
            'sort-imports': 'off',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        [String.raw`^\u0000`], // side effects
                        ['^node:'],
                        [String.raw`^@?(?!app|api|components|static|store|images)[\w-]`], // external
                        ['^@components/', '^@app/', '^@api/', '^@store/', '^@/'],
                        ['^@declarations/'], // types
                        ['^@static/', '^@images/'], // assets
                        [
                            String.raw`^\.\.(?!/?$)`,
                            String.raw`^\./(?=.*/)`,
                            String.raw`^\.(?!/?$)`,
                            String.raw`^\./?$`,
                        ], // local
                        [String.raw`^.+\.s?css$`], // styles
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'variable',
                    format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'function',
                    format: ['camelCase', 'PascalCase'],
                },
            ],
            semi: ['warn', 'always'],
            'no-console': 'error',
            'padding-line-between-statements': [
                'warn',
                { blankLine: 'always', prev: '*', next: 'return' },
            ],
            'spaced-comment': ['error', 'always', { markers: ['/'] }],
            '@typescript-eslint/no-misused-new': 'error',
            'consistent-return': 'off',
            'guard-for-in': 'error',
            'no-constructor-return': 'error',
            'no-else-return': 'error',
            'no-eval': 'error',
            'no-extend-native': 'error',
            'no-extra-bind': 'error',
            'no-floating-decimal': 'error',
            'no-implicit-globals': 'error',
            'no-new': 'error',
            'no-script-url': 'error',
            'max-depth': ['error', 3],
            'max-nested-callbacks': ['error', 3],
            'new-cap': 'error',
            'no-multi-assign': 'error',
            'no-multiple-empty-lines': 'error',
            'no-nested-ternary': 'error',
            'no-trailing-spaces': 'error',
            'no-underscore-dangle': 'error',
            'no-whitespace-before-property': 'error',
            'object-curly-spacing': ['error', 'always'],
            'operator-assignment': ['error', 'always'],
            'padded-blocks': ['error', 'never'],
            'semi-spacing': 'error',
            'semi-style': ['error', 'last'],
            'space-before-blocks': 'error',
            'space-in-parens': ['error', 'never'],
            'space-unary-ops': 'error',
            'switch-colon-spacing': 'error',
            'array-bracket-spacing': ['error', 'never'],
            'block-spacing': 'error',
            camelcase: 'off',
            'unicorn/prefer-switch': ['error', { minimumCases: 3 }],
            'unicorn/filename-case': 'off',
            'unicorn/prefer-query-selector': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/no-null': 'off',
            'unicorn/consistent-function-scoping': 'off',
            'unicorn/prefer-logical-operator-over-ternary': 'off',
            'unicorn/no-static-only-class': 'off',
            'unicorn/prefer-ternary': 'off',
            'unicorn/prefer-global-this': 'off',
            'unicorn/no-negated-condition': 'off',
            'unicorn/prefer-spread': 'off',
            'unicorn/prefer-includes': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'unicorn/prefer-string-replace-all': 'off',
            '@typescript-eslint/no-duplicate-enum-values': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'unicorn/error-message': 'off',
            'unicorn/prefer-add-event-listener': 'off',
            'unicorn/prefer-array-some': 'off',
        },
    },
);
