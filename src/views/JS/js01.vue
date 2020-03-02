<style scoped>
</style>
<template>
  <div class="js01"></div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {}
})
export default class Js01 extends Vue {
  mounted() {
    this.debounce(this.testFn, 1000)("testFn");
    this.debounce(this.testFn, 1000)("testFn");
    this.debounce(this.testFn, 1000)("testFn");
    this.debounce(this.testFn, 1000)("testFn");
    this.getType([]);
  }
  testFn(fnName) {
    console.log(fnName + "调用该测试函数");
  }
  //评论五角星--------------------------------------------
  start(count) {
    let stars = "★★★★★☆☆☆☆☆";
    let result = stars.slice(5 - count, 10 - count);
    return result;
  }
  //防抖--------------------------------------------------
  debounce(fn, delay) {
    return (args?) => {
      let time = delay;
      if (fn.id) {
        clearTimeout(fn.id);
      }
      fn.id = setTimeout(() => {
        fn.call(this, args);
      }, time);
    };
  }
  //下拉加载-----------------------------------------------
  handleScorll() {
    if (this.getScrollTop() + this.getWindowHeight() > this.getScrollHeight()) {
    }
  }
  // 获取文档的总高度
  getScrollHeight() {
    let scrollHeight = 0,
      bodyScrollHeight = 0,
      documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight =
      bodyScrollHeight - documentScrollHeight > 0
        ? bodyScrollHeight
        : documentScrollHeight;
    return scrollHeight;
  }
  //获取滚动条在Y轴上的距离
  getScrollTop() {
    let scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop =
      bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }
  //浏览器视口的高度
  getWindowHeight() {
    let windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  }
  //类型判断-----------------------------------------------
  getType(data){
      let toString = Object.prototype.toString;
      let type = toString.call(data)
      console.log(type)
  }
}
</script>
<style scope>
</style>


