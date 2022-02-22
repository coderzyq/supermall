import Vue from "vue";
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const state = {
    cartList: []
}
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
    /*: {
        //mutations唯一的目的就是修改state中的状态
        //mutations中的每个方法尽可能完成的事件比较单一一点
        /!*addCounter(state, payload) {
            payload.count++
        },
        addToCart(state, payload) {
            state.cartList.push(payload)
        }*!/
        /!*addCart(state, payload) {
            //payload新添加的商品
            /!*let oldProduct = null
            for (let item of state.cartList) {
                if (item.iid === payload.iid) {
                    oldProduct = item
                }
            }*!/
            //查找之前数组中是否有该商品
            let oldProduct = state.cartList.find(function (item) {
                return item.iid === payload.iid
            })
            //2.判断oldProduct
            if(oldProduct) {
                oldProduct.count += 1
            } else {
                payload.count = 1
                state.cartList.push(payload)
            }
        }*!/
    },*/

/*: {
        //context上下文
        addCart(context, payload) {
            //payload新添加的商品
            /!*let oldProduct = null
            for (let item of state.cartList) {
                if (item.iid === payload.iid) {
                    oldProduct = item
                }
            }*!/
            //查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(function (item) {
                return item.iid === payload.iid
            })
            //2.判断oldProduct
            if(oldProduct) {
                //oldProduct.count += 1
                context.commit('addCounter', oldProduct)
            } else {
                payload.count = 1
                //context.state.cartList.push(payload)
                context.commit('addToCart', payload)
            }
        }
    }*/
})

//3.挂载到Vue实例上
export default store
