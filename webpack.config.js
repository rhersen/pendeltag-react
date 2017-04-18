module.exports = {
    context: __dirname + '/app',
    entry: './main.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {test: /\.css$/, loader: 'style!css'}
        ]
    },
    devServer: {
        proxy: {
            '/json/*': {
                target: 'http://localhost:1337',
                secure: false
            }
        }
    },
    output: {
        filename: 'bundle.js'
    }
}
