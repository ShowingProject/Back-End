module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine', 'commonjs'],
    files: [{
      pattern: 'service/**/*.js'
    }, {
      pattern: 'test/**/*.js'
    },{
      pattern: 'node_modules/q/*.js'
    }],

    preprocessors: {
      'node_modules/q/*.js': ['commonjs'],
      'service/**/*.js': ['commonjs'],
      'test/**/*.js': ['commonjs']
    },

    reporters: ['progress'],

    browsers: ['PhantomJS']
  });
};