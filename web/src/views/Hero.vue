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
        <!-- end of top -->

        <div>
            <div class="bg-white px-3">
                <!-- 菜单部分 -->
                <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
                    <div class="nav-item active">
                        <div class="nav-link">初识英雄</div>
                    </div>
                    <div class="nav-item">
                        <div class="nav-link">进阶攻略</div>
                    </div>
                </div>
            </div>
            <!-- 内容部分 -->
            <swiper>
                <swiper-slide>
                    <div>
                        <!-- 技能模块 -->
                        <div class="p-3 bg-white border-bottom">
                            <!-- btn -->
                            <div class="d-flex">
                                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                                    <i class="iconfont icon-bofang"></i>
                                    英雄介绍视频
                                </router-link>
                                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                                    <i class="iconfont icon-image"></i>
                                   进阶攻略
                                </router-link>
                            </div>
                            <!-- skills -->
                            <div class="skills bg-white mt-4">
                                <!-- icon -->
                                <div class="d-flex jc-around">
                                    <img 
                                    class="icon"
                                    @click="currentSkillIndex = i"
                                    :class="{active: currentSkillIndex === i}"
                                    :src="item.icon"
                                    v-for="(item, i) in model.skills"
                                    :key="item.name" 
                                    />
                                </div>
                                <!-- content -->
                                <div v-if="currentSkill">
                                    <div class="d-flex pt-4 p   b-3" >
                                        <h3 class="m-0">{{currentSkill.name}}</h3>
                                        <span class="ml-4 text-grey-1">
                                            (冷却值：{{currentSkill.delay}} 消耗：{{currentSkill.cost}})
                                        </span>
                                    </div>
                                    <p>{{currentSkill.description}}</p>
                                    <div class="border-bottom "></div>
                                    <p>
                                        小提示：{{currentSkill.tips}}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- 出装推荐模块 -->
                        <m-card plain icon="Menu" title="出装推荐" class="hero-items">
                            <div class="fs-xl">顺风出装</div>
                            <div class="d-flex jc-around text-center mt-3">
                                <div v-for="item in model.item1" :key="item._id">
                                    <img :src="item.icon" alt="" class="icon">
                                    <div class="fs-xs">{{item.name}}</div>
                                </div>
                            </div>
                            <div class="border-bottom mt-3"></div>
                            <div class="fs-xl mt-3">逆风出装</div>
                            <div class="d-flex jc-around text-center mt-3">
                                <div v-for="item in model.item2" :key="item._id">
                                    <img :src="item.icon" alt="" class="icon">
                                    <div class="fs-xs">{{item.name}}</div>
                                </div>
                            </div>
                        </m-card>

                        <m-card plain icon="Menu" title="使用技巧">
                            <p class="m-0">{{model.usageTips}}</p>
                        </m-card>

                        <m-card plain icon="Menu" title="对抗技巧">
                            <p class="m-0">{{model.battleTips}}</p>
                        </m-card>

                        <m-card plain icon="Menu" title="团战思路">
                            <p class="m-0">{{model.teamTips}}</p>
                        </m-card>

                        <m-card plain icon="Menu" title="英雄关系">
                            <div class="fs-xl">最佳搭档</div>
                            <div class="d-flex pt-3" v-for="(item,i) in model.partners" :key="i">
                                <img :src="item.hero.avatar" alt="" height="50">
                                <p class="m-0 ml-3 flex-1">{{item.description}}</p>
                            </div>
                            <div class="border-bottom my-3"></div>

                            <div class="fs-xl">被谁克制</div>
                            <div class="d-flex pt-3" v-for="item in model.restrained" :key="item._id">
                                <img :src="item.hero.avatar" alt="" height="50">
                                <p class="m-0 ml-3 flex-1">{{item.description}}</p>
                            </div>
                            <div class="border-bottom mt-3"></div>
                        </m-card>
                        
                    </div>
                </swiper-slide>
                <swiper-slide></swiper-slide>
            </swiper>
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
            model: null,
            currentSkillIndex: 0
        }
    },
    computed: {
        currentSkill() {
            return this.model.skills[this.currentSkillIndex]
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
@import '../assets/scss/_variables.scss';
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
    // 技能部分
    .skills {
        img.icon {
            width: 70px;
            height: 70px;
            border: 3px solid map-get($colors, 'white');
            &.active {
                border-color: map-get($colors, 'primary');
            }
            
            border-radius: 45%;
        }
        
    }
    .hero-items {
        img.icon {
            width: 45px;
            height: 45px;
            border-radius: 50%;
        }
    }
}


</style>