const env = require("postcss-preset-env");

const config = {
  plugins: [
    env({
      stage: 3,
      features: {
        'nesting-rules': true,
      }
    })
  ],
};

module.exports = config;
