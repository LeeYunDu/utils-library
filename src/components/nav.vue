<template>
  <div>
    <div class="nav-list">
        <li @click="router('css')">CSS</li>
        <li @click="router('js')">JS</li>
        <li @click="router('component')">组件</li>
        <li @click="router('vue')">vue测试</li>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Nav extends Vue{
  mounted () {
    let fn = this.$listeners.change;
  }
  router(id){
    this.$router.push({name:id})
  }
  
}
</script>

<style  scope>
   .nav-list{
       display: flex;
       list-style: none;
       
   }
   .nav-list > li {
     margin: 0 auto;
     padding:10px 0;
     width: 100px;
     text-align: center;
     background: green;
   }
</style>
