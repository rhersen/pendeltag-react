module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  globals: {
    require: false,
    module: true,
    _: true,
    describe: false,
    expect: false,
    jest: false,
    it: false
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "curly": ["error", "multi"],
    "complexity": ["error", 6],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "max-depth": ["error", 2],
    "max-len": ["error", 120],
    "max-params": ["error", 4],
    "max-statements": ["error", 13],
    "no-else-return": ["error"],
    "no-extra-parens": ["error"],
    "no-shadow": ["error"],
    "no-unneeded-ternary": ["error"],
    "no-var": ["error"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "no-unused-vars": "off"
  }
};