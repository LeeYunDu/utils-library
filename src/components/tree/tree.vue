<style scoped>
    ul{
        margin: 0;
        padding: 0;
    }
    .tree-group{
        list-style: none;
        margin: 0;
        padding: 0 20px;
        
    }
    .icon-add{
        width: 20px;
        height: 20px;
        margin: 4px;
    }
    .tree-group-name{
        display: flex;
        align-items: center;
    }
    .terr-group-chidren-box{
        transition: all .5s;
        overflow: hidden;
        max-height: 500px;
    }
    .hide{
       max-height: 0px;
    }
</style>
<template>
  <div>
    <ul>
        <li v-for="(item1,index1) in treeList" :key="index1"  :class="['tree-group']">
            <div class="tree-group-name">
                <img class="icon-add" src="/static/images/icon-show.png" alt="" v-if="item1.children&&item1.showChildren" @click="showChildren(item1,index1)">
                <img class="icon-add" src="/static/images/icon-hide.png" alt="" v-else-if="item1.children&&!item1.showChildren" @click="showChildren(item1,index1)">
                <div class="icon-add" v-else></div>
                <span>{{item1.name}}</span>
            </div>
            <div :class="['terr-group-chidren-box',item1.showChildren?'':'hide']">
                <tree :treeList='item1.children' :toggle='handeToggleShow' ></tree>
            </div>
        </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    name:'tree'
})
export default class Tree extends Vue{
  @Prop(Array)
  treeList:Array<any>
  @Prop({type:Boolean,default:true})
  toggle:Boolean
  handeToggleShow = true
  mounted () {
    console.log(this.toggle)
  }
  showChildren(arr,index){
      arr.showChildren = !arr.showChildren
      this.treeList[index] = arr
      this.handeToggleShow = !this.handeToggleShow
  }
  
}
</script>


