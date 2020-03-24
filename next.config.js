//github.com/zeit/next.js/blob/canary/examples/with-ant-design-less/next.config.js

require('dotenv').config();

const fs = require('fs');
const path = require('path');

const withSourceMaps = require('@zeit/next-source-maps')();

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

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
    DATABASE_TYPE: process.env.DATABASE_TYPE,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_SSL_CERT: process.env.DATABASE_SSL_CERT,
    // same as in ...
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
    SENTRY_DSN: process.env.SENTRY_DSN,
    REVUE_TOKEN: process.env.REVUE_TOKEN,
    SLACK_TOKEN: process.env.SLACK_TOKEN,
    CONVERTKIT_API_KEY: process.env.CONVERTKIT_API_KEY,
    CONVERTKIT_FORM_ID: process.env.CONVERTKIT_FORM_ID,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET: process.env.S3_BUCKET,
  },
  webpack: (config, { isServer }) => {
    // Less with Antd
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

    // MDX
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    // Sentry
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    return config;
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
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins(
  [
    [withLess, lessWithAntdConfig],
    [withMDX],
    [withSourceMaps],
    [withBundleAnalyzer],
  ],
  nextConfig
);
