module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "package.json"],
  parser: "@babel/eslint-parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "detect" } },
  plugins: ["react-refresh", "react"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react/react-in-jsx-scope": "on",
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "react-refresh/only-export-components": [
      "off",
      { allowConstantExport: true },
    ],
  },
};
