//Constants
const path = require("path");
const webpack = require("webpack");
const fs = require("fs");

//Webpack config object
module.exports = env => {
   return {
      //set webpack build mode
      mode: env && env.production === true ? "production" : "development",
      //Node polyfills
      node: {
         process: true
      },
      //add a banner
      plugins: [
         new webpack.BannerPlugin({
            banner: "//ReactMagnifier (c) 2020, Sandeep Vattapparambil",
            raw: true
         })
      ],
      //set minification flag
      optimization: {
         minimize: env && env.production === true ? true : false
      },
      //set webpack bundle entry point
      entry: path.resolve(__dirname, "../", "src/export.js"),
      //set webpack bundle output
      output: {
         //set output target for UMD
         library: "ReactMagnifier",
         libraryTarget: "umd",
         path: path.resolve(__dirname, "../", "dist"),
         filename: env && env.production === true ? "ReactMagnifier.min.js" : "ReactMagnifier.js",
         umdNamedDefine: true,
         globalObject: "typeof self !== 'undefined' ? self : this"
      },
      //set up babel transpiler
      module: {
         rules: [
            {
               test: /\.js$/,
               loader: "babel-loader",
               exclude: /node_modules/
            },
            {
               test: /\.css$/i,
               use: ["style-loader", "css-loader"]
            }
         ]
      },
      //set console logs in color
      stats: {
         colors: true
      },
      //include source-map in builds
      devtool: "cheap-source-map"
   };
};
