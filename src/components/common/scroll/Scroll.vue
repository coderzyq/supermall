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
    props: {
      probeType: {
          type: Number,
          default: 0
      },
      pullUpLoad: {
          type:  Boolean,
          default: false
      }
    },
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
        //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
          // probeType: 3
      })
        //2.监听滚动的位置
        if (this.probeType === 2 || this.probeType ===3) {
            this.scroll.on('scroll', (position) => {
                //console.log(position);
                this.$emit('scroll', position)
            })
        }
        //3.监听scroll滚动到底部
        if (this.pullUpLoad) {
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            })
        }
      //this.scroll.scrollTo(0, 0)
    },
    methods: {
        scrollTo(x, y, time=500) {
            this.scroll && this.scrollTo && this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp()
        },
        refresh() {
            this.scroll && this.scroll.refresh && this.scroll.refresh()
        },
        getScrollY() {
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>

<style scoped>

</style>
