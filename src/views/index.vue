<style scoped>
</style>
<template>
  <div style="overflow:auto;">
      <Nav @change=change></Nav>
      <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Nav from "@/components/nav.vue";
import TestMixin from "../mixins/test-mixin";
import { Getter } from "vuex-class";

// const path = require('path');
// const files = require.context('@/components/',false,/\.vue$/);
// const modules = {};


@Component({
  components: {
    Nav,
  },
  mixins: [TestMixin]
})
export default class Index extends Vue<TestMixin> {
  mounted() {

  }
  change(){
    return 'this is Fn this.$listeners'
  }
}
</script>
<style scope>
.compoment-box {
  width: 33%;
  float: left;
}
</style>


