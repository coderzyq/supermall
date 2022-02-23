import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-types";

/*
export default {
    addCounter(state, payload) {
        payload.count++
    },
    addToCart(state, payload) {
        state.cartList.push(payload)
    }
}*/
export default {
    [ADD_COUNTER](state, payload) {
        //payload.count = 0
        payload.count ++
        console.log(payload.count)
    },
    [ADD_TO_CART](state, payload) {
        console.log(payload)
        payload.checked = true
        state.cartList.push(payload)
    }
}
