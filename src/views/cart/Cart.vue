<template>
    <div id="cart">
        <!--导航-->
        <nav-bar class="nav-bar">
            <!--<div slot="center">购物车({{ cartLength }})</div>-->
            <div slot="center">购物车({{ length }})</div>
        </nav-bar>
        <!--商品列表-->
        <cart-list></cart-list>
        <!--底部汇总-->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from "components/common/navigationbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import {mapGetters} from 'vuex'

export default {
    name: "Cart",
    components: {
        NavBar,
        CartList,
        CartBottomBar
    },
    computed: {
        //两种用法
        //第一种用法
        //...mapGetters(['cartLength', 'cartList'])
        //第二种用法
        ...mapGetters({
            length: 'cartLength',
            list: 'cartList'
        })
    }
}
</script>

<style scoped>
#cart {
    /*position: relative;*/
    height: 100vh;
}

.nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
}
</style>
