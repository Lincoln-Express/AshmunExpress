/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    sourceMaps: true,
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
