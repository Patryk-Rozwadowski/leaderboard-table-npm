const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
   mode: "production",
   devtool: "source-map",
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
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/
         },
         {
            test: /\.scss$/,
            use: [
               {
                  loader: "file-loader",
                  options: {
                     name: "/index.css"
                  }
               },
               {
                  loader: "extract-loader"
               },
               {
                  loader: "css-loader",
                  options: {
                     sourceMap: true
                  }
               },
               {
                  loader: "postcss-loader"
               },
               {
                  loader: "sass-loader"
               }
            ]
         }
      ]
   },
   resolve: {
      extensions: [".ts", ".js"]
   },
   output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "umd",
      library: "Leaderboard",
      umdNamedDefine: true
   }
};
