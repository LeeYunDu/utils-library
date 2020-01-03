<style scoped>
</style>
<template>
  <div>
    <breadcurmb></breadcurmb>
      <h5>商城</h5>
      <ul>
        <li @click="router('服装店')">服装店</li>
        <li @click="router('鞋子店')">鞋子店</li>
        <li @click="router('配饰店')">配饰店</li>
      </ul>
      <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import breadcurmb from '@/components/breadcrumb/breadcrumb.vue'

@Component({
  components: {breadcurmb},
  
})
export default class Vue1 extends Vue {
  router(id){
    this.$router.push({name:id})
  }
}
</script>
<style scope>

</style>


