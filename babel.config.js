module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ],
      "modules": false,
      "useBuiltIns": "entry"
    }]
  ]
}
