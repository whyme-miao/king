const mongoose = require('mongoose')

const shema = new mongoose.Schema({
    username: { type: String },
    password: { 
        type: String,
        select: false, // 密码在查询的时候无法查出
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('AdminUser', shema)
