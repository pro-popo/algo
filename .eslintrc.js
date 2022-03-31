module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': ['error'],
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
};
