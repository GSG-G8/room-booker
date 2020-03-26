module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  root: true,
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    // configure the prettier plugin
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true
      }
    ]
  },
  plugins: ["prettier"]
};
