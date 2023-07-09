module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module',
    },
    'plugins': [
        '@typescript-eslint',
    ],
    'rules': {
        'globalThis': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        'no-empty': 'off',
        'no-case-declarations': 'off',
        'no-self-assign': 'off',
        'no-empty-function': 'off',
        'no-useless-escape': 'off',
        'no-redeclare': 'off',
        'no-prototype-builtins': 'off',
        'no-control-regex': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-var-requires': 'off',
        'no-unused-vars': 'off',
        'no-irregular-whitespace': 'off',
        'no-async-promise-executor': 'off',
        'no-empty-method': 'off',
        'no-constant-condition': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
    },
};
