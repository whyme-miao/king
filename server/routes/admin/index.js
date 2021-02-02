module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true
    })
    // const Category = require('../../models/Category')

    // 添加分类接口
    router.post('/', async(req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 修改分类接口
    router.put('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 删除分类接口
    router.delete('/:id', async(req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
        })
    })
    // 获取分类列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if(req.Model.modelName == 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    // 根据id获取分类数据
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    // 模型中间件
    const resourceMiddleware = require('../../middleware/resource')

    // 设置通用CRUD
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router )

    // express本身获取不到上传文件的数据，要借助中间件 multer
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads'}) //dest:目标地址
    app.post('/admin/api/upload',authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file  // 本身req没有file属性，使用中间件upload.single('file')才有
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录接口

    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 1. 根据用户名找用户

        // 定义AdminUser模型的时候，设置了select为false，默认找不到，所以这里需用select('+password')强制查出
        const user = await AdminUser.findOne({username}).select('+password')  // 前缀- 被排除， 前缀+ 被选择
        assert(user, 422, '用户不存在')
        // if(!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }

        // 2. 校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // 3.返回token
        const token = jwt.sign({id: user._id}, app.get('secret'))
        res.send({token})     
    })

    // 错误处理中间件
    app.use( async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

}