<template>
<div class="tab-control">
    <div v-for="(item, index1) in titles"
         class="tab-control-item"
         :class="{active: index1 === currentIndex}"
         @click="itemClick(index1)"
         :key="index1">
        <span>{{item}}</span>
    </div>
</div>
</template>

<script>
export default {
    name: "TabControl",
    props: {
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        itemClick(index1) {
            //改变currentIndex
            this.currentIndex = index1
            this.$emit('tabClick', index1)
        }
    }
}
</script>

<style scoped>
.tab-control {
    display: flex;
    text-align: center;
    font-size: 16px;
    height: 44px;
    line-height: 44px;
    background-color: #f0f0f0;
}

.tab-control-item {
    flex: 1;
}

.active {
    color: var(--color-high-text);

}
.active span {
    border-bottom: 3px solid var(--color-high-text);
    padding: 5px;
}
</style>
