<template>
<div class="bottom-bar">
    <div class="check-content">
        <check-button
            class="check-button"
            :is-checked="isSelectAll" @click.native="checkClick"></check-button>
        <span>全选</span>
    </div>

    <div class="total-price">
        合计: ¥{{totalPrice}}
    </div>
    <div class="calculate">
        去结算：{{checkLength}}
    </div>
</div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";

export default {
    name: "CartBottomBar",
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['cartList']),
        totalPrice() {
            const cartList = this.$store.getters.cartList
            return cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.count * item.price
            }, 0).toFixed(2)
        },
        checkLength() {
            return this.cartList.filter(item => item.count).length

            //return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            //if (this.cartList.length === 0) return false
            // return !(this.cartList.filter(item => !item.checked).length)
            if (this.cartList.length === 0) return false
            return !this.cartList.find(item => !item.checked)
            //普通遍历方法
            /*for (let item of this.cartList) {
                if (!item.checked) {
                    return false
                }
            }
             return true*/
        },
    },
    methods: {
        checkClick() {
            if (this.isSelectAll) {
                //全部选中
                this.cartList.forEach(item => item.checked = false)
            } else {
                //部分或者全部不选中
                this.cartList.forEach(item => item.checked = true)
            }
            //下面这个有问题，不能做简化
            // this.cartList.forEach(item => item.checked = !this.isSelectAll)
        }
    }
}
</script>

<style scoped>
.bottom-bar {
    height: 40px;
    background-color: #eeeeee;
    position: relative;
    /*bottom: 40px;*/
    line-height: 40px;
    display: flex;
}
.check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 100px;
    font-size: 18px;
}
.check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.total-price{
    margin-left: 30px;
    font-size: 18px;
    color: #666;
    flex: 1;
}
.calculate {
    font-size: 18px;
    background-color: red;
    color: #eeeeee;
    width: 100px;
    text-align: center;
}
</style>
