//github.com/zeit/next.js/blob/canary/examples/with-ant-design-less/next.config.js

require('dotenv').config();

const fs = require('fs');
const path = require('path');

const withPlugins = require('next-compose-plugins');
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const bundleAnalyzer = require('@next/bundle-analyzer');

const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID:
      process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
    STRIPE_CLIENT_ID: process.env.STRIPE_CLIENT_ID,
    STRIPE_CLIENT_SECRET: process.env.STRIPE_CLIENT_SECRET,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    COUPON_SALT: process.env.COUPON_SALT,
    COUPON_URL: process.env.COUPON_URL,
    FIREBASE_ADMIN_UID: process.env.FIREBASE_ADMIN_UID,
  },
};

const lessWithAntdConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: lessToJS(
      fs.readFileSync(
        path.resolve(__dirname, './assets/antd-custom.less'),
        'utf8'
      )
    ),
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function'
          ? []
          : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }

    return config;
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins(
  [[withLess, lessWithAntdConfig], [withBundleAnalyzer]],
  nextConfig
);
