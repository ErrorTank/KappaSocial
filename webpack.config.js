const path = require("path");

module.exports = {
    entry: "./src/client/loader.js",
    output: {
        path: path.join(__dirname, "public"),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",  //just one loader
                exclude: /node_modules/
            },
            // {
            //     test: /\.js$/,
            //     loader: "babel-loader",  //just one loader
            //     exclude: /node_modules/
            // },
            // {
            //     test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'
            // },
            {
                test: /\.styl$/,
                use: [ //use if apply many loaders
                    "style-loader",
                    "css-loader",
                    "stylus-loader"
                ]
            },
        ]
    },
    devtool: "cheap-module-eval-source-map"
};
