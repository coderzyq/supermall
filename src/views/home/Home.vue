<template>
      <div id="home">
          <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
          <home-swiper :banners="banners"></home-swiper>
          <recommend-view :recommends="recommends"></recommend-view>
      </div>
</template>

<script>
import NavBar from "components/common/navigationbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";

import {getHomeMultidata} from "network/home";
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
    name: "Home",
      components: {
        NavBar,
        HomeSwiper,
        RecommendView
      },
    data() {
        return {
            banners: [],
            recommends: []
        }
    },
    created() {
        //1.请求多个数据
        getHomeMultidata().then(
            res => {
                console.log(res)
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            }
        )
    }
}
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: #ffffff;
    }
</style>
