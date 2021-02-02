module.exports = options => {
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    const assert = require('http-assert')
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
        const { id } = jwt.verify(token , req.app.get('secret'))  // 注意：这里app需要从req中拿，req.app=app
        assert(id, 401, '请先登录')
        req.user = await AdminUser.findById(id)  // 为了让后面的中间件可以用到user，把它挂在到req中
        assert(req.user, 401, '请先登录')
        next()
    } 
}