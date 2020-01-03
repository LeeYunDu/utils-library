<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'


@Component({
})
export default class App extends Vue {
  appData = 'appData'
}
</script>

<style>
/* flex 快速布局 */
/* 两边对齐 */
.between{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 水平垂直居中 */
.all-center{
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 垂直居中 */
.align-center{
  display: flex;
  align-items: center;
}
/* 文字溢出 */
.font-overflow-1,.font-overflow-2,.font-overflow-3{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.font-overflow-1{-webkit-line-clamp:1}
.font-overflow-2{-webkit-line-clamp:2}
.font-overflow-3{-webkit-line-clamp:3}
</style>