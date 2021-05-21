let upstreamTransformer = require("metro-react-native-babel-transformer");
let svgTransformer = require("react-native-svg-transformer");

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith(".svg")) {
    return svgTransformer.transform({ src, filename, options });
  } else {
    return upstreamTransformer.transform({ src, filename, options });
  }
};
