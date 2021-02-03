<template>
    <div>
      <!-- 轮播图 -->
      <swiper :options="swiperOptions">
        <!-- 轮播的图片 -->
        <swiper-slide >
          <img class="w-100" src="../assets/images/1593953548594-home_01.jpeg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/1593953568470-home_02.jpeg" alt="">
        </swiper-slide>
        <swiper-slide>
          <img class="w-100" src="../assets/images/1593953580407-home_03.jpeg" alt="">
        </swiper-slide>
        <!-- 小圆点分页器 -->
        <div class="swiper-pagination pagination-home text-right px-3 pd-2" slot="pagination"></div>
      </swiper>
      <!-- end of swiper -->

      <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
        <div class="d-flex flex-wrap">
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-news"></i>
            <div class="py-2">爆料站</div>
          </div>
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-book"></i>
            <div class="py-2">故事站</div>
          </div>
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-shop"></i>
            <div class="py-2">周边商城</div>
          </div>
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-shopp"></i>
            <div class="py-2">体验服</div>
          </div>
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-1"></i>
            <div class="py-2">新人专区</div>
          </div>
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-2"></i>
            <div class="py-2">荣耀-传承</div>
          </div>
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-3"></i>
            <div class="py-2">王者营地</div>
          </div>
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-4"></i>
            <div class="py-2">公众号</div>
          </div>
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-5"></i>
            <div class="py-2">版本介绍</div>
          </div>
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-6"></i>
            <div class="py-2">对局环境</div>
          </div>
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-book"></i>
            <div class="py-2">无限王者团</div>
          </div>
          <div class="nav-item mb-3 mb-3 ">
            <i class="sprite sprite-news"></i>
            <div class="py-2">创意互动营</div>
          </div>
        </div>
        <!-- 收起菜单 -->
        <div class="bg-light py-2 fs-sm">
          <i class="sprite sprite-arrow mr-1"></i>
          <span>收起</span>
        </div>
      </div>
      <!-- end of nav-icons -->

      <!-- 新闻资讯 -->
      <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats" >
        <template #items="{category}">
          <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex" v-for="(news, i) in category.newsList" :key="i">
            <span class="text-info">[{{news.categoryName}}]</span>
            <span class="px-2">|</span>
            <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
            <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
          </router-link>
        </template>
      </m-list-card>
      <!-- 英雄列表 -->
      <m-list-card icon="-superhero" title="英雄列表" :categories="heroCats" >
        <template #items="{category}">
          <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
            <router-link
            tag="div"
            :to="`/heroes/${hero._id}`" 
            class="text-center p-2"
            style="width:20%"
            v-for="(hero, i) in category.heroList" :key="i">
              <img :src="hero.avatar" alt="" class="w-100"/>
              <div>{{hero.name}}</div>
            </router-link>
          </div>
        </template>
      </m-list-card>

      <m-card icon="Menu" title="英雄列表"></m-card>
      <m-card icon="Menu" title="精彩视频"></m-card>
      <m-card icon="Menu" title="图文攻略"></m-card>


      



    </div>
</template>

<script>
import dayjs from "dayjs"

export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
        swiperOptions: {
          loop: true, // 设置图片循环
          autoplay: true, //设置可自动播放、
          // speed: 1000, //自动播放的速度，每个1秒滑动一次
          pagination: {
            el: '.pagination-home',
            clickable: true,  //设置分页小圆点可手动点击
          }
        },
        foldIcon: false, // 控制图标区域的展开
        newsCats: [], // 新闻数据
        heroCats: []  // 英雄数据
    }
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }

  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
  }
    
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.pagination-home {
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    opacity: 1;
    background: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info')
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

 
</style>
