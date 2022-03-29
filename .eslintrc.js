module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': ['warn'],
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
};
