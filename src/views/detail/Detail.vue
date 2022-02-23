<template>
<div id="detail">
    <detail-nav-bar
        class="detail-nav"
        @titleClick="titleClick"
        ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :detail-info="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="showBackTop"></back-top>
<!--    <toast :message="message" :show="show"></toast>-->
</div>
</template>

<script>

import DetailNavBar from "./childComs/DetailNavBar";
import DetailSwiper from "./childComs/DetailSwiper";
import DetailBaseInfo from "./childComs/DetailBaseInfo";
import DetailShopInfo from "./childComs/DetailShopInfo";
import DetailGoodsInfo from "./childComs/DetailGoodsInfo";
import DetailParamInfo from "./childComs/DetailParamInfo";
import DetailCommentInfo from "./childComs/DetailCommentInfo";
import DetailBottomBar from "./childComs/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
import {debounce} from "common/util";
import {itemListenerMixin, backTopMixin} from 'common/mixin';
import {mapActions} from 'vuex'

// import Toast from "components/common/toast/Toast";
export default {
    name: "Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        // Toast
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0,
            // message: '',
            // show: false
        }
    },
    created() {
        //1.保存传入的iid
        this.iid = this.$route.params.iid
        //2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            const data = res.result
            //2.1获取顶部的轮博图片
            this.topImages = data.itemInfo.topImages
            //2.2获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //2.3创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)
            //2.4保存商品的详情数据
            this.detailInfo = data.detailInfo
            //2.5获取参数的信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            //2.7获取评论信息
            if (data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }
        })
        //3.请求详情数据
        getRecommend().then(res => {
            console.log(res);
            this.recommends = res.data.list
        })
        //4.给getThemeTopY赋值
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []

            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)

            console.log(this.themeTopYs);
        }, 100)
        /*this.$nextTick(() => {
            //根据最新的数据，对应的DOM是已经被渲染出来
            //但是图片依然没有加载完（目前获取到offsetTop不包含其中的图片）
            //offsetTop值不对的时候,都是因为图片的问题
            this.themeTopYs = []

            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

            console.log(this.themeTopYs);
        })*/
    },
    methods: {
        ...mapActions(['addCart']),
        imageLoad() {
            this.$refs.scroll.refresh()
            this.getThemeTopY()
            //this.$nextTick(() => {
                /*this.themeTopYs = []

                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

                console.log(this.themeTopYs);*/
            //})
        },
        titleClick(index) {
            console.log(index)
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        },
        contentScroll(position) {
            //console.log(position);
            //1.获取y值
            const positionY = -position.y
            //2. positionY和主题中的值进行比较
            //[0, 7938, 9120, 9452, Number.MAX_VALUE]
            let length = this.themeTopYs.length - 1
            for (let i in this.themeTopYs) {
                let inti = parseInt(i) - 1 //此处的i为字符串,所以需要转换成整数型
                if (this.currentIndex !== inti && (positionY > this.themeTopYs[inti] && positionY < this.themeTopYs[inti+1])) {
                    this.currentIndex = inti
                    console.log(this.currentIndex)
                    this.$refs.nav.currentIndex = this.currentIndex
                }
                /*if (this.currentIndex !== inti && ((inti < length -1 && positionY >= this.themeTopYs[inti] && positionY <
                    this.themeTopYs[inti + 1]) || (inti === length -1 && positionY >= this.themeTopYs[inti]))) {
                    this.currentIndex = inti
                    console.log(this.currentIndex)
                    this.$refs.nav.currentIndex = this.currentIndex
                }*/
            }

            //3.是否显示回到顶部
            this.listenerShowBack(position)
        },
        addToCart() {
            console.log("123");
            //1.获取购物车所需要的商品信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid

            //2.将商品添加到购物车(1.mapActions,  2.Promise)
            //this.$store.state.cartList.push(product)
            //这是mutation里边的方法
            //this.$store.commit('addCart', product)
            this.addCart(product).then(res => {
                // this.show = true
                // this.message = res

                // setTimeout(() => {
                //     this.show = false
                //     this.message = ''
                // }, 1500)
                console.log(res);
                this.$toast.show(res)
            })
            //这是action里边的方法
            /*this.$store.dispatch('addCart', product).then(res => {
                //3.添加到购物车成功
                console.log(res)
            })*/
            console.log(this.$store.state.cartList);



        }
    },
    mounted() {

    },
    destroyed() {
        this.$bus.$off('itemImageLoad', this.itemImageListener)
    }
}
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
}
.detail-nav {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
}
.content {
    height: calc(100% - 44px - 58px);
}
</style>
