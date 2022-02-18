<template>
      <div id="home">
          <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
          <scroll class="content" ref="scroll">
              <home-swiper :banners="banners"></home-swiper>
              <recommend-view :recommends="recommends"></recommend-view>
              <feature-view></feature-view>
              <tab-control class="tab-control"
                           :titles="['流行','新款','精选']"
                           @tabClick="tabClick"></tab-control>
              <goods-list :goods="showGoods"></goods-list>
          </scroll>
          <back-top @click.native="backClick"></back-top>
      </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navigationbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "network/home";



export default {
    name: "Home",
      components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
      },
    data() {
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []}
            },
            currentType: 'pop'
        }
    },
    computed: {
      showGoods() {
          return this.goods[this.currentType].list
      }
    },
    created() {
        //1.请求多个数据
        this.getHomeMultidata()

        //请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    methods: {
        /**
         * 事件监听相关的方法
         */
        tabClick(index) {
            switch (index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
        },
        backClick() {
            //this.$refs.scroll.scroll.scrollTo(0, 0, 500)
            this.$refs.scroll.scrollTo(0, 0)
        },
        /**
         * 网络请求相关的方法
         */
        getHomeMultidata() {
            getHomeMultidata().then(
                res => {
                    console.log(res)
                    this.banners = res.data.banner.list
                    this.recommends = res.data.recommend.list
                }
            )
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(
                res => {
                    console.log(res)
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                }
            )
        }
    }
}
</script>

<style scoped>
#home {
    /*padding-top: 44px;*/
    /*vh表示视口*/
    height: 100vh;
}
    .home-nav {
        background-color: var(--color-tint);
        color: #ffffff;
        position: sticky;
        top: 0;
        z-index: 999;
    }

    .tab-control {
        position: sticky;
        top: 40px;
        z-index: 99999;
    }

    .content {
        height: calc(100% - 93px);
        overflow: hidden;

    }
</style>
