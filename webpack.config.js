"use strict";

// Требуется для формирования полного output пути
let path = require('path');

// Плагин для очистки выходной папки (bundle) перед созданием новой
const CleanPlugin = require('clean-webpack-plugin');

// Плагин для экстракта текста в файл (нужно для создания файлов стилей)
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Путь к выходной папке
const bundleFolder = "bundle/";

module.exports = {
    // Точка входа в приложение
    entry: {
        main: "./src/js/main.js"
    },

    // Выходной файл
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, bundleFolder)
    },
    module: {
      rules: [
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            // Примечание: Если у sass-loader не указать ?sourceMap - то выдает ошибку что не найден node-sass (Хрень какая-то)
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    "css-loader?sourceMap",
                    "sass-loader?sourceMap"
                ]
            })
        }
      ]
    },
    resolve: {
        extensions: [".js"]
    },
    plugins: [
        new CleanPlugin([bundleFolder]),
        new ExtractTextPlugin("styles.css")
    ],
    // Включаем генерацию отладочной информации внутри выходного файла
    // (Нужно для работы отладки клиентских скриптов)
    devtool: "inline-source-map"
};