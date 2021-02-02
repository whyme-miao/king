<template>
    <!-- 一开始model为null,所以下面的model.title会报错，加v-if，若不存存在，则不渲染 -->
    <div class="page-article" v-if="model">
        <div class="d-flex py-3 px-2 border-bottom">
            <div class="iconfont icon-fanhui text-blue"></div>
            <strong class="flex-1 text-blue pl-2 text-ellipsis">
                {{model.title}}
            </strong>
            <div class="text-grey fs-xs">
                2020/02/01
            </div>
        </div>
        <!-- 详细内容 -->
        <div v-html="model.body" class="px-3 body fs-lg"></div>
        <!-- 相关资讯 -->
        <div class="px-3 border-top py-3">
            <div class="d-flex ai-center">
                <i class="iconfont icon-Menu"></i>
                <strong class="text-blue fs-lg ml-1">相关资讯</strong>
            </div>
            <div class="pt-1    ">
                <router-link 
                class="py-2"
                tag="div" 
                :to="`/articles/${item._id}`" 
                v-for="item in model.related"
                :key="item._id" >
                {{item.title}}
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        id: {required: true},
    },
    data() {
        return {
            model: null
        }
    },
    
    watch: {
        id: 'fetch',
        // id() {
        //     this.fetch()
        // }
    },
    methods: {
        // 获取文章详情
        async fetch() {
            const res = await this.$http.get(`articles/${this.id}`)
            this.model = res.data
        }
    },
    created() {
        this.fetch()
    }
}

</script>

<style lang="scss">
.page-article {
    .icon-fanhui {
        font-size: 1.6923rem;
    }
    .body {
        img {
            max-width: 100%;
            height: auto;
        }
        iframe {
            max-width: 100%;
            height: auto;
        }
    }
}
</style>