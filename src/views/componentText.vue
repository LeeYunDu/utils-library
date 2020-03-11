<style scoped>
.div1{
  display: flex;
}
.div2{
  flex:  0 0 170px;
  border: 1px solid;
}
ul li{
  font-size: 14px;
  color: #999;
}
</style>
<template>
  <div class="componentTest">
    <ul>
      <li @click="router('Paging')">分页按钮</li>
      <li @click="router('bigFileUpload')">大文件断点续传/分片上传</li>
      <li @click="router('tree')">多级标签栏折叠</li>
      <li @click="router('alert')">挂载 alert/loading 弹窗</li>
      <li @click="router('validatorForm')">表单验证</li>
      <li @click="router('swiperImg')">轮播图 -缩略图  </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component,Watch, Prop } from "vue-property-decorator";
import Nav from '@/components/nav.vue'
import Paging from "@/components/Paging.vue";
import render from '@/components/render.vue'

import validatorForm from '@/components/validatorForm/form.vue'
import bigFileUpload from '@/components/bigFileUpload/bigFileUpload.vue'
@Component({
    components:{
        Paging,
        render,
        Nav,
        validatorForm,
        bigFileUpload
    }
})
export default class ComponentText extends Vue{
  
  arr = [1,2,3,4,5,6,7]
  
  router(name){
    this.$router.push({name:name})
  }
  changeArr(){
    this.arr[2] = 99
    console.log(this.arr)
    this.$set(this.arr,2,99)
    this.arr = [1,3,5]
  }
  beforeRouteLeave(to,from,next){
    console.log(to,from);
    next();
  }

  @Watch('$route')
  routeWatch(newValue,oldValue){
    console.log(newValue,oldValue)
  }
  mounted () {
    
  }
  
}
</script>


