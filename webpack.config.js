const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
   mode: "development",
   devtool: false,
   entry: path.resolve(__dirname, "src/index.ts"),
   optimization: {
      minimize: true,
      minimizer: [
         new TerserPlugin({
            exclude: "setupTest.*s"
         })
      ]
   },
   module: {
      rules: [
         {
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/
         },
         {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"]
         }
      ]
   },
   resolve: {
      extensions: [".tsx", ".ts", ".js"]
   },
   output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist")
   }
};
