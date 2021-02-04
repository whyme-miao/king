module.exports = {
    outputDir: __dirname + '/../server/web',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
    devServer: {
        open: true  // 启动服务器是否打开浏览器
    }
}