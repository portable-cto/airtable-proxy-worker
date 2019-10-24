const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({
      wpConfig: {
        airtableApiUrl: JSON.stringify(process.env.AIRTABLE_API_URL || 'https://api.airtable.com'),
        airtableBaseId: JSON.stringify(process.env.AIRTABLE_API_BASE_ID || ''),
        airtableApiVersion: JSON.stringify(process.env.AIRTABLE_API_VERSION || 'v0'),
        airtableApiKey: JSON.stringify(process.env.AIRTABLE_API_KEY || ''),
        cacheTime: JSON.stringify(process.env.PROXY_CACHE_TIME || 0),
        prefix: JSON.stringify(process.env.PROXY_PREFIX || ''),
        allowedTargets: JSON.stringify(process.env.ALLOWED_TARGETS || '*'),
      },
    }),
  ],
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "dist",
    filename: "worker.js"
  }
};
