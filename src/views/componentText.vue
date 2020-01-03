<style scoped>
.div1{
  display: flex;
}
.div2{
  flex:  0 0 170px;
  border: 1px solid;
}
</style>
<template>
  <div class="componentTest">
    <Paging :total="167" :row="10"></Paging>
    <render :Level=3>Hello world!</render>
    <tree :treeList='testArr' :toggle='true'></tree>
    <div class="div1">
      <div class="div2" v-for="(item,index) in arr" :key="index">{{item}}</div>
    </div>
    <button @click="changeArr">change</button>
    <lee-form>
      <lee-form-item label="姓名姓名姓名" icon="icon-add" width="80">
        <input type="text" placeholder="请输入您的姓名">
      </lee-form-item>
    </lee-form>
    <bigFileUpload></bigFileUpload>
    
  </div>
</template>

<script lang="ts">
import { Vue, Component,Watch, Prop } from "vue-property-decorator";
import Nav from '@/components/nav.vue'
import Paging from "@/components/Paging.vue";
import render from '@/components/render.vue'
import tree from '@/components/tree.vue'
import validatorForm from '@/components/validatorForm/form.vue'
import bigFileUpload from '@/components/bigFileUpload/bigFileUpload.vue'
@Component({
    components:{
        Paging,
        render,
        tree,
        Nav,
        validatorForm,
        bigFileUpload
    }
})
export default class componentText extends Vue{

  arr = [1,2,3,4,5,6,7]
  testArr = [
    {
      name:'title1',
      showChildren:true,
      children:[
        {
          name:'title1-1',
          showChildren:true,
          children:[{name:'title-1-1'}]
        },
        {
          name:'title1-2',
          showChildren:true,
          children:[{name:'title-1-1'}]
        }
      ]
    },
    {
      name:'title2',
      showChildren:true,
      children:[
        {
          name:'title1-1',
          showChildren:true,
          children:[{name:'title-1-1'}]
        },
        {
          name:'title1-2',
          showChildren:true,
          children:[{name:'title-1-1'}]
        }
      ]
    },
    {
      name:'title3',
      showChildren:true,
    }
  ]

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
    // this.$Toast.info({
    //   message:'提交成功',//
    //   duration:1500,
    //   icon:'success',
    //   mask:true,
    //   success:()=>{
    //     console.log('调用成功')
    //   }
    // })
    // this.$Toast.loading({
    //     message:'加载中',
    //     duration:30000,
    //     mask:true,
    //     success:()=>{
    //       console.log('调用成功')
    //     }
    // })
    // setTimeout(() => {
    //   this.$Toast.close();
    // }, 100000);
  }
  
}
</script>


