module.exports = {
    devServer: {
        open: true  // 启动服务器是否打开浏览器
    },
    outputDir: __dirname + '/../server/admin',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/admin'
    : '/'
}