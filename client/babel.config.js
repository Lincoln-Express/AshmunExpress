/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true);
  return {
    // presets: ["babel-preset-expo", "@babel/env", "@babel/preset-typescript"],
    // plugins: [
    //   "@babel/proposal-class-properties",
    //   "@babel/proposal-object-rest-spread",
    // ],
    presets: ["babel-preset-expo"],
    sourceMaps: true,
  };
};
