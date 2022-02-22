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
    addCounter(state, payload) {
        console.log(payload.count)
        payload.count+= 1
        console.log(payload.count);
    },
    addToCart(state, payload) {
        console.log(payload)
        state.cartList.push(payload)
    }
}
