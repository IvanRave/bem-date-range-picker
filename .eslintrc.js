// http://eslint.org/docs/user-guide/configuring
// docs for rules at http://eslint.org/docs/rules/{ruleName}
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "mocha": true,
        "es6": false,
        "node": true,
        "bem-xjst/bemhtml": true
    },
    "extends": [
        "eslint:recommended",
        "airbnb-base"
    ],
    "plugins": [
        // https://github.com/bem/eslint-plugin-bem-xjst
        "bem-xjst"
    ],
    "globals": {
        // ymodules global variable
        // todo: find a ymodules plugin
        //   or change a module system, eg. from ymodules to commonjs
        "modules": true
    },
    "rules": {
        // http://eslint.org/docs/rules/brace-style
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "arrow-body-style": "off",
        "valid-jsdoc": "warn",
        "eol-last": "warn",
        "comma-dangle": "off",
        "object-shorthand": "off",
        "global-require": "off",
        "func-names": "off",
        "prefer-arrow-callback": "off",
        "padded-blocks": "warn",
        "prefer-template": "off",
        "vars-on-top": "off",
        "max-len": "off",
        "quote-props": "off",
        "no-unused-expressions": "off",
        "no-var": "off",
        "no-param-reassign": "warn",
        "no-console": "off",
        "space-before-function-paren": "off",
        "import/no-extraneous-dependencies": [
            "warn",
            { "devDependencies": true }
        ],
        "no-restricted-syntax": [
            "error",
            "ArrowFunctionExpression",
            "ClassExpression"
        ]
    }
};
