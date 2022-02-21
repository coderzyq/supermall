import {POP, NEW, SELL} from "./const";
import {debounce} from "@/common/util";
import BackTop from "components/content/backTop/BackTop";
import {BACKTOP_DISTANCE} from "./const";

export const backTopMixin = {
  components: {
    BackTop
  },
  data: function () {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
      listenerShowBack(position) {
          this.showBackTop = -position.y > BACKTOP_DISTANCE
      }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}

export const itemListenerMixin = {
    data() {
      return {
          itemImageListener: null
      }
    },
    mounted() {
        let newRefresh = debounce(this.$refs.scroll.refresh, 100)

        this.itemImageListener = () => {
            newRefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImageListener)
    }
}
