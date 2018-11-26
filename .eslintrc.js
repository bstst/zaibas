module.exports = {
  "extends": "airbnb-base",
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  rules: {
    semi: 2,
    "func-names": 0,
    "arrow-parens": 0,
    "no-console": 1,
    "no-bitwise": 0,
    "no-confusing-arrow": 0,
    "space-before-function-paren": 0,
    "import/prefer-default-export": 0,
    "react/prefer-stateless-function": 0,
    "react/prop-types": 0,
    "react/jsx-boolean-value": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/anchor-is-valid": 0,
  },
};