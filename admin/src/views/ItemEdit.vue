<template>
    <div>
        <h1>{{id ? '编辑': '新建'}}物品</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称"  >
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标"  >
                <!-- action表示上传的接口地址 -->
                <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeader()"
                :show-file-list="false"
                :on-success="afterUpload"
                >
                <img v-if="model.icon" :src="model.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        id: {}
    },
    data() {
        return {
            model: {}
        }
    },
    methods: {
        // 上传图片成功后
        afterUpload(res) {

            // vue中数据的响应式问题：
            // 因为model初始值为空，这里直接给model添加icon属性，普通赋值 this.model.icon = res.url 有可能不起作用
            // 所以用this.$set(主体，属性，值)--------vue的显示赋值
            // this.model.icon = res.url
            this.$set(this.model, 'icon', res.url)
        },
        async save() {
            
            if(this.id) {
                // 修改分类
                await this.$http.put(`rest/items/${this.id}`,this.model)
            }else {
                // 新增分类
                await this.$http.post('rest/items', this.model)
            }
            
            this.$router.push('/items/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },
        // 根据id获取分类数据
        async fetch() {
            const res = await this.$http.get(`rest/items/${this.id}`)
            this.model = res.data
        }

    },
    created() {
        this.id && this.fetch()
    }
}
</script>

