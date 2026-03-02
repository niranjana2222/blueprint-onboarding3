const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Use react-native-svg-transformer for .svg files
config.transformer.babelTransformerPath =
  require.resolve('react-native-svg-transformer');

// Remove svg from assetExts and add to sourceExts
config.resolver.assetExts = config.resolver.assetExts.filter(
  ext => ext !== 'svg',
);
config.resolver.sourceExts.push('svg');

module.exports = config;
