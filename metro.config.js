const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    resolver: {
      assetExts: [...assetExts, 'tflite'], // Add 'tflite' to the existing assetExts
    },
  };

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
