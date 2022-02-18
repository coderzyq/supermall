<template>
<!--    ref 一般绑定到子组件上-->
<!--    ref如果绑定到组件中的，那么通过this.$refs.refname获取的是一个元素对象-->
<div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: "Scroll",
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
      })
      //this.scroll.scrollTo(0, 0)
    },
    methods: {
        scrollTo(x, y, time=500) {
            this.scroll.scrollTo(x, y, time)
        }
    }
}
</script>

<style scoped>

</style>
