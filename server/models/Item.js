const mongoose = require('mongoose')

const shema = new mongoose.Schema({
    name: {
        type: String
    },
    icon: {
        type: String
    }
})


module.exports = mongoose.model('Item', shema)

