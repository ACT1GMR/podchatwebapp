const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const PACKAGE = require('./package.json');
const version = PACKAGE.version;

module.exports = (e, argv) => {
  const mode = argv.mode;
  let base = {
    devServer: {
      compress: true,
      public: 'chat.fanapsoft.ir', // That solved it
      contentBase: path.join(__dirname, '/node_modules/podchatweb/dist/'),
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "node_modules/podchatweb/src"),
            path.resolve(__dirname, "node_modules/raduikit/src")
          ],
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react"
              ],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    "legacy": true
                  }
                ],
                ["@babel/plugin-proposal-class-properties", {"loose": true}]
              ]
            }
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: {minimize: true}
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: mode === "production" ? "[hash:base64:5]" : "[local]"
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                additionalData: '@import "../variables.scss";',
                sassOptions: {
                  includePaths: [__dirname, "styles"]
                }

              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|ttf|eot|woff2|woff)$/,
          use: [
            {
              loader: "url-loader?limit=10000000"
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]
  };

  //IF MODE IS PRODUCTION
  if (mode === "production") {
    base.output = {
      path: __dirname + "/dist",
      filename: `index-${version}.js`,
      libraryTarget: "umd",
      library: "lib"
    };
    base.plugins.push(
      new CopyWebpackPlugin([
        {
          from: 'styles/fonts/**/*',
          toType: 'dir'
        },
        {
          from: 'styles/images/**/*',
          toType: 'dir'
        }
      ]));
  } else {
    base.devtool = "source-map";
  }
  return base;
};
