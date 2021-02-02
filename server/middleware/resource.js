module.exports = options => {
    return async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource) // 小写转类名
        req.Model = require(`../models/${modelName}`)
        next()
    }
}