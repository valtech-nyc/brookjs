module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            impliedStrict: true,
            jsx: true
        },
    },
    env: {
        es6: true,
        node: true,
        browser: true
    },
    extends: [
        'valtech'
    ]
};