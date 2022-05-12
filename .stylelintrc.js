module.exports = {
  plugins: [
    "stylelint-scss"
  ],
  rules: {
    // color
    "color-hex-case": "lower",
    "color-named": "never",
    "color-no-invalid-hex": true,
    //font-family
    "font-family-name-quotes":"always-where-recommended",
    //string
    "string-quotes": "double",
    //units
    "unit-case": "lower",
    "unit-blacklist":["em", "rem", "deg"],
    // "unit-whitelist": [
    //   ["px","pt"],
    //   {
    //     "%": ["width"]
    //   }
    // ],
    //value
    "value-keyword-case": "lower",
    "value-list-comma-space-after": "always",
    "value-list-comma-space-before": "never",
    "value-list-max-empty-lines": 0,
    // value list
    "property-case": "lower",
    //declaration
    "declaration-bang-space-after": "never",
    "declaration-colon-space-after": "always",
    //declaration block
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,
    // "declaration-block-semicolon-newline-after": "always",
    //selector
    "selector-type-case": "lower",
    //general
    "indentation": 2,
    "max-empty-lines": [2,{ "ignore": ["comments"]} ],
    "no-extra-semicolons": true

  }
  // "ignoreFiles": "dist/**/css/**"
}
