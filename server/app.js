// 引入body-parser模块 用来处理post请求参数
// const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// 设置全局变量，用于token
app.set('secret', 'dddldjslfj')

app.use('/uploads', express.static(__dirname + '/uploads'))

// 处理post请求参数
app.use(express.json()) // 处理 application/json数据
// app.use(bodyParser.urlencoded({extended: false}))
app.use(require('cors')())  // 处理跨域

// 连接数据库
require('./plugins/db.js')(app)
// 引入admin路由
require('./routes/admin/index.js')(app)
// 引入web路由
require('./routes/web/index.js')(app)


// 监听端口
app.listen(3000, () => {
    console.log('http://localhost:3000')
})