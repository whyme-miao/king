<template>
  <div>
    <!-- 顶部 -->
    <div class="topbar bg-black py-2 px-3 d-flex ai-center" >
      <img src="../assets/logo.png" alt="" height="30">
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button class="btn bg-primary">立即下载</button>
    </div>
    <!-- 导航栏 -->
    <div class="bg-primary pt-3 pb-2">
      <div class="nav jc-around nav-invers pd-1">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>

    <router-view/>

  </div>
</template>

<script>
export default {

}


</script>

<style lang="scss">
.topbar {
  position: sticky;  // 有兼容问题
  top: 0;
  z-index: 999;
}

</style>
