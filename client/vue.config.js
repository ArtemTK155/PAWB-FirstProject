module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 2000,
    },
  }
}