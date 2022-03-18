<template>
    <div id="category">
        <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
        <div class="content">
            <tab-menu :categories="categories"
                      @selectItem="selectItem"></tab-menu>
            <scroll id="tab-content">
                <div>
                    <tab-content-category :subcategories="showSubcategory"></tab-content-category>
                    <tab-control :titles="['综合', '新品', '销量']"
                                 @tabClick="tabClick"></tab-control>
                    <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/common/navigationbar/NavBar";
import TabMenu from "@/views/category/childComps/TabMenu";
import Scroll from "@/components/common/scroll/Scroll";
import TabContentCategory from "@/views/category/childComps/TabContentCategory";
import TabContentDetail from "@/views/category/childComps/TabContentDetail";

import TabControl from "@/components/content/tabControl/TabControl";
import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'

import {POP, SELL, NEW} from '@/common/const'
import {tabControlMixin} from "@/common/mixin";

export default {
    name: "Category",
    components: {
        Scroll,
        NavBar,
        TabMenu,
        TabContentCategory,
        TabControl,
        TabContentDetail
    },
    mixins: [tabControlMixin],
    data() {
        return {
            categories: [],
            categoryData: {

            },
            currentIndex: -1,
        }
    },
    created() {
        //请求分类数据
        this._getCategory()
    },
    computed: {
        showSubcategory() {
            if (this.currentIndex === -1) return {}
            return this.categoryData[this.currentIndex].subcategories
        },
        showCategoryDetail() {
            if (this.currentIndex === -1) return []
            return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
        }
    },
    methods: {
        _getCategory() {
            getCategory().then(res => {
                //1.获取分类数据
                this.categories = res.data.category.list
                //2.初始化每个类别的子数据
                for (let i = 0; i < this.categories.length; i++) {
                    this.categoryData[i] = {
                        subcategories: {},
                        categoryDetail: {
                            'pop': [],
                            'new': [],
                            'sell': []
                        }
                    }
                }
                //3.请求第一个分类的数据
                this._getSubcategories(0)
            })
        },
        _getSubcategories(index) {
            this.currentIndex = index
            const maitKey = this.categories[index].maitKey
            getSubcategory(maitKey).then(res => {
                this.categoryData[index].subcategories = res.data
                //将获取的数据保存下来
                this.categoryData = {...this.categoryData}
                //更换类型
                this._getCategoryDetail(POP)
                this._getCategoryDetail(SELL)
                this._getCategoryDetail(NEW)
            })
        },
        _getCategoryDetail(type) {
          //获取请求的miniWallkey
          const miniWallkey = this.categories[this.currentIndex].miniWallkey
          //发送请求，传入miniWallkey和type
          getCategoryDetail(miniWallkey, type).then(res => {
              //将获取的数据保存下来
              this.categoryData[this.currentIndex].categoryDetail[type] = res
              this.categoryData = {...this.categoryData}
          })
        },
        /**
         * 事件响应相关的事件
         */
        selectItem(index) {
            this._getSubcategories(index)
        }
    }
}
</script>

<style scoped>
#category {
    height: 100vh;
    overflow: hidden;
}

.nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    z-index: 9999;
    position: relative;
}

.content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
    overflow: hidden;
}

#tab-content {
    height: 100%;
    flex: 1;
}
</style>
