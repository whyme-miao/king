module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.set('useFindAndModify', false)
    mongoose.connect('mongodb://xian:xian@localhost:27017/node-vue-king', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    // 把models文件夹下面的文件都引用一遍
    require('require-all')(__dirname + '/../models')
}