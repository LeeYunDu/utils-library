<style scoped>
.breadcrumb{
    font-size: 14px;
    color: #666;
    display: inline-block;
}
.place{
    margin: 0 4px;
}
</style>
<template>
  <div>
      <h4>面包屑</h4>
      <div class="breadcrumb" @click="router(item)" v-for="(item,index) in $route.meta" :key="item">
          {{item}}
          <span class="place" v-if="index!=$route.meta.length-1">/</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
  
})
export default class Breadcrumb extends Vue {
    mounted() {
        console.log(this.$route)   
    }
    router(id){
        this.$router.push({name:id})
    }
}
</script>
<style scope>

</style>


