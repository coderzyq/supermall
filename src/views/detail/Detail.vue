<template>
<div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :detail-info="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
</div>
</template>

<script>

import DetailNavBar from "./childComs/DetailNavBar";
import DetailSwiper from "./childComs/DetailSwiper";
import DetailBaseInfo from "./childComs/DetailBaseInfo";
import DetailShopInfo from "./childComs/DetailShopInfo";
import DetailGoodsInfo from "./childComs/DetailGoodsInfo";
import DetailParamInfo from "./childComs/DetailParamInfo";

import Scroll from "components/common/scroll/Scroll";

import {getDetail, Goods, Shop, GoodsParam} from "network/detail";

export default {
    name: "Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo
    },
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {}
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
    },
    methods: {
        imageLoad() {
            this.$refs.scroll.refresh()
        }
    }
}
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 999999;
    background-color: #ffffff;
    height: 100vh;
}
.detail-nav {
    position: relative;
    z-index: 9999;
    background-color: #ffffff;
}
.content {
    height: calc(100% - 44px);
}
</style>
