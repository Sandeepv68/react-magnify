const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const nodeExternals = require("webpack-node-externals");

//Webpack config object
module.exports = env => {
   return {
      //set webpack build mode
      mode: env && env.production === true ? "production" : "development",

      //add a banner
      plugins: [
         new webpack.BannerPlugin({
            banner: "//ReactMagnifier (c) 2020, Sandeep Vattapparambil",
            raw: true
         })
      ],
      //exclude node_modules
      externals: [nodeExternals()],
      //set minification flag
      optimization: {
         minimize: env && env.production === true ? true : false
      },
      //set webpack bundle entry point
      entry: path.resolve(__dirname, "../src/ReactMagnifier/ReactMagnifier.tsx"),
      //set webpack bundle output
      output: {
         //set output target for UMD
         library: "react-magnifier",
         libraryTarget: "commonjs2",
         path: path.resolve(__dirname, "../", "dist"),
         filename: env && env.production === true ? "reactMagnifier.min.js" : "reactMagnifier.js"
      },
      //set up babel transpiler
      module: {
         rules: [
            {
               test: /\.ts(x?)$/,
               exclude: /node_modules/,
               use: [
                  {
                     loader: "ts-loader"
                  }
               ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
               enforce: "pre",
               test: /\.js$/,
               loader: "source-map-loader"
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
      }
   };
};
