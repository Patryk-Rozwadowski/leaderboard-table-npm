const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
   mode: "production",
   target: "web",
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
                     name: "dist/leaderboard.min.css"
                  }
               },
               {
                  loader: "extract-loader"
               },
               {
                  loader: "css-loader"
               },
               {
                  loader: "postcss-loader"
               },
               {
                  loader: "sass-loader",
                  options: {
                     sassOptions: {
                        includePaths: [path.resolve(__dirname, "src/style/*")]
                     }
                  }
               }
            ]
         }
      ]
   },
   resolve: {
      extensions: [".ts", ".js", ".css"]
   },
   output: {
      filename: "dist/leaderboard.min.js",
      path: path.resolve(__dirname, "."),
      libraryTarget: "umd",
      library: "Leaderboard",
      globalObject: "this",
      umdNamedDefine: true
   }
};
