<template>
    <div class="page-hero" v-if="model">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white" >
            <img src="../assets/logo.png" alt="" height="30">
            <div class="px-2 flex-1">
                <span class="text-white">王者荣耀</span>
                <span class="ml-2">攻略站</span>
            </div>
            <router-link to="/" tag="div">更多英雄 &gt;</router-link>
        </div>
        <div class="top" :style="{'background-image': `url(${model.banner})`}">
           <div class="info text-white p-3 d-flex h-100 flex-column jc-end">
                <div class="fs-sm">{{model.title}}</div>
                <h2 class="my-2">{{model.name}}</h2>
                <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
                <!-- 
                    加上v-if="model.scores"的原因：
                    下面model.scores.diffcult有嵌套了基层，如果model.scores不存在，会报错
                    -->
                <div class="d-flex jc-between pt-2">
                    <div class="scores d-flex ai-center" v-if="model.scores">
                        <span>难度</span>
                        <span class="badge bg-primary">{{model.scores.difficult}}</span>
                        <span>技能</span>
                        <span class="badge bg-blue-1">{{model.scores.skills}}</span>
                        <span>攻击</span>
                        <span class="badge bg-danger">{{model.scores.attack}}</span>
                        <span>生存</span>
                        <span class="badge bg-dark">{{model.scores.survive}}</span>
                    </div>
                    <router-link to="/" tag="span" class="text-grey fs-sm">
                        皮肤：2 &gt;
                    </router-link>
                </div>
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
    methods: {
        async fetch() {
            const res = await this.$http.get(`heroes/${this.id}`)
            this.model = res.data
            console.log(this.model)
        }
    },
    created() {
        this.fetch()
    }
}
</script>

<style lang="scss">
.page-hero {
    .top {
        height: 50vw;
        background: #fff no-repeat top center;  // vertical: top ; level: center
        background-size: 100% 100%; // 宽auto 高100%
    }
    .info {
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
        .scores {
            .badge {
                margin: 0 0.3rem;
                display: inline-block;
                width: 1rem;
                height: 1rem;
                line-height: 1rem;
                border-radius: 50%;
                text-align: center;
                font-size: 0.6rem;
                border: 1px solid rgba(255,255,255, 0.2)
            }
        }
    }
}

</style>