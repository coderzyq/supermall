import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-types";

export default {
    addCart(context, payload) {
        //查找之前数组中是否有该商品
        console.log(payload)
        console.log(context)
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        console.log(oldProduct)
        //2.判断oldProduct
        if(oldProduct) {
            //oldProduct.count += 1
            //console.log(oldProduct.count)
            context.commit("addCounter", oldProduct)
        } else {
            payload.count = 1
            console.log(payload)
            //context.state.cartList.push(payload)
            context.commit('addToCart', payload)
        }
    }
}
